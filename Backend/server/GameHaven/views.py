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
load_dotenv()

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
    filtered = ["name_original", "background_image", "released", "updated", "website", "platforms", "stores", "tags", "description_raw"] #The fields I want from the API response
    try:
        slug = game_search(game_name) #getting the slug from the game search, only doing this because I don't know how to find the slug ann easier way.
        GH = os.getenv("GH_KEY")
        url = f"https://api.rawg.io/api/games/{slug}?key={GH}"
        response  = requests.get(url)
        data = response.json()

        filtered = {key: data[key] for key in filtered if key in data} #if the key is in filtered and the key is in data, add it to the filtered list
    except Exception as e:
        return HttpResponse(str(e), status = 404)
    return JsonResponse(filtered, status = 200)

def create_user(request, firstname: str, lastname: str, name: str, password: str, email: str):
    try:
        profile = User.objects.create_user(first_name = firstname, last_name = lastname, username= name, password = password, email = email)
        profile.created_at(timezone.now) #setting the time the profile was created
        profile.save() #saving it to the data base
    except Exception as e:
        return HttpResponse(str(e), status = 404)
    return profile # Would return a profile instance and I'd have access to profile.username etc.

#typically, at least for this project, helper functions shouldn't return any sort of http or json response!