
from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse, request, response, JsonResponse
import httpx
from dotenv import load_dotenv
import os #the operating system, loading it in to access files on the laptop
import json
import requests
from .models import *
from users.models import User
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
       if(game == "Fortnite" or game == "fortnite"): #random hard code because saying fortnite alone will bring up an unrelated game
           game = "Fortnite Battle Royale"
       GH = os.getenv("GH_KEY") #loading in RAWG API key.
       url = f"https://api.rawg.io/api/games?search={game}&search_exact=true&page=1&key={GH}"
       response = requests.get(url) 
       data = response.json()
       slug = data["results"][0]["slug"] #accessing the first slug from the returned list
       name = data["results"][0]["name"]#getting the first game name
       
    except Exception as e:
         raise Exception(f"Error in game_search: {e}") 
    return {"slug":slug, "name": name}



@csrf_exempt
def set_fav_game(request, game_name: str):
    if request.method != 'POST': #Checking if the function is a POST method
        return HttpResponse("This is only meant to be for post functions", status=404)
    data = json.loads(request.body) #Loading in the request information
    user_name = data["user"] # pulling the username
    user = User.objects.get(username=user_name) #Getting the user, should always work, by this point a user would have created their own account by now etc.
    try:
        game_name = game_name.title()
        print("In the try block")
        if Game.objects.filter(name=game_name).exists(): #If the game exists...
            print("the game exists")
            game = Game.objects.get(name=game_name) # get the game object
            print(game.name)
            user.favorite_game = game #update the users, favorite game with the game ID
            user.save() #save the information
            info = {
                "name_original": game.name,
                "background_image" : game.game_image,
                "released" : game.released,
                "website":game.website,
                "description": game.description
            }

        else: #Not in the database already 
            print("its not the database already")
            game_details(request, game_name) ##This will add the game to the db and also display it for use.
            print("after game deets")
            game = Game.objects.get(name=game_name) #now it should be in the database
            print(game.name)
            user.favorite_game = game #update the users game information
            user.save() #save the game
            info = {
                "name_original": game.name,
                "background_image" : game.game_image,
                "released" : game.released,
                "website":game.website,
                "description": game.description
            }
    except Exception as e:
        return HttpResponse(str(e), status=404)
    return JsonResponse(info, status=200)


   #Here's the rundown of this function,
   ###
   #  First, I use check if the Game that user wants exists in the database, if not then I will add it and it's data
   #  Then, I will access the user it self, and grab the current new Games username if there is one, then I will update the users information with the new game
   # ###



#This function is used for pulling game data from the given slug.
def game_details(request, game_name: str):
    try:
        #You need to add the game to the database if it doesn't exist, so I will first search for the game slug.
        game_name = game_name.title()
        details = game_search(game_name) #getting the slug from the game search
        slug = details.get("slug") #getting slug for the API call if needed
        title = details.get("name") #getting the title to check if the game exists or not
        
         #checks to see if the game with the title exists, if it does i'll return a json with our game details instead of making another API call
        if Game.objects.filter(name=title).exists():
            game = Game.objects.get(name=title)
            info = {
                "name_original": game.name,
                "background_image" : game.game_image,
                "released" : game.released,
                "website":game.website,
                "description": game.description
            }
            return JsonResponse(info, status=200)
        
        #this section of code should only run if it's not already in the database
        GH = os.getenv("GH_KEY")
        url = f"https://api.rawg.io/api/games/{slug}?key={GH}"
        response  = requests.get(url)
        data = response.json()

        #The fields I want from the API response
        needed = ["name_original","background_image", "released", "updated", "website", "platforms", "stores", "tags", "description_raw"] 
        filtered = {key: data[key] for key in needed if key in data} #if the key is in filtered and the key is in data, add it to the filtered list
        try:    
                print("adding to DB") #keeping this check here for now
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

