from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse, request, response, JsonResponse
import httpx
from dotenv import load_dotenv
import os #the operating system, loading it in to access files on the laptop
import json
import requests
from .models import *
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
load_dotenv()
import datetime
#Will add specificc error handling in future iterations.

def index(request):
    return HttpResponse("This is the start of something great!")

#writing my game_search functionality, this function should return the slug of the first game from a page that is returned
def game_search(game: str): 
    try:
       GH = os.getenv("GH_KEY") #loading in RAWG API key.
       url = f"https://api.rawg.io/api/games?search={game}&search_exact=true&page=1&key={GH}"
       response = requests.get(url) 
       data = response.json()
       slug = data["results"][0]["slug"] #accessing the first slug from the returned list
    except Exception as e:
         raise Exception(f"Error in game_search: {e}")  # Raise a proper exception
    return slug

#This function is used for pulling game data from the given slug.
def game_details(request, game_name: str):
    needed = ["name_original", "background_image", "released", "updated", "website", "platforms", "stores", "tags", "description_raw"] #The fields I want from the API response
    try:
        slug = game_search(game_name) #getting the slug from the game search, only doing this because I don't know how to find the slug ann easier way.
        GH = os.getenv("GH_KEY")
        url = f"https://api.rawg.io/api/games/{slug}?key={GH}"
        response  = requests.get(url)
        data = response.json()

        filtered = {key: data[key] for key in needed if key in data} #if the key is in filtered and the key is in data, add it to the filtered list
        try:
            if Game.objects.filter(name=filtered.get("name_original")).exists():
                return JsonResponse(filtered, status=200) #no need to add the game since it is already there.     
            else:
                add_game_to_DB(filtered) # if it doesn't exist, add it to the database.
        except Exception as e:
            print(str(e))
            return HttpResponse(str(e), status = 404)
    except Exception as e:
        return HttpResponse(str(e), status = 404)
    return JsonResponse(filtered, status = 200)


def add_game_to_DB(game_details: dict) -> bool:
    try:
        # Extracting the necessary fields from the game_details dictionary
        title = game_details.get("name_original")
        website = game_details.get("website")
        released = None
        description = game_details.get("description_raw")
        if game_details.get("released"):
            released = datetime.datetime.strptime(game_details.get("released"), "%Y-%m-%d").date()
        image = game_details.get("background_image")
        game = Game.objects.create(
        name=title,
        website=website,
        released=released,
        description=description,
        game_image = image
        
    )
        game.save()
    except Exception as e:
        raise Exception(f"Error: {str(e)}")
    
    return True


@csrf_exempt
def create_user(request):
    try:
        if(request.method != 'POST'):
           return HttpResponse("This function is only for POST methods", status = 404) 
    
        data = json.loads(request.body)
        firstname = data.get("firstName")
        lastname = data.get("lastName")
        email = data.get("email")
        password = data.get("password")
        username = data.get("userName")
    
        if not all([firstname, lastname, email, password, username]):
            return HttpResponse("There are missing fields", status = 404) 
    
        profile = User.objects.create_user(first_name=firstname, last_name=lastname, email=email, password=password, username=username)
        profile.created_at = timezone.now()
        profile.save()
    except Exception as e:
        return HttpResponse(str(e), status = 404)
    
    return JsonResponse({
            "username": profile.username,
            "firstName": profile.first_name,
            "lastName": profile.last_name,
            "email": profile.email,
        }, status=201)
     # Would return a profile instance and I'd have access to profile.username etc.

#typically, at least for this project, helper functions shouldn't return any sort of http or json response!