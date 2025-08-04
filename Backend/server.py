from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from dotenv import load_dotenv
import os
import json
load_dotenv()

app = FastAPI() #initializing my fast api app.

origins = [
    "http://localhost:3000",   # React Frontend
    "http://127.0.0.1:3000",   # same frontend, different loopback
    "http://localhost:8000",   #FastAPI dev backend
    "http://127.0.0.1:8000"    #Same backend diff format
]

app.add_middleware( #setting up middleware for frontend to backend connection
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

@app.get("/")
def first_function():
    line = "welcome to Game Haven"
    return {"message": line}


@app.get("/game_list/{game}")
async def game_search(game: str):
    try:
        GH = os.getenv("GH_KEY")
        url = f"https://api.rawg.io/api/games?search={game}&search_exact=true&page=1&key={GH}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url) #using await because I am pulling from an external api
            data = response.json()
            slug = data["results"][0]["slug"] #only getting the first index because most likely the first choice is the one i want
        # Accessing a nested value: outer_dict["key_for_list"][index]["key_in_inner_dict"]
    except HTTPException as e:
        return {"error": str(e)}
    return slug

@app.get("/game_info/{game}")
async def game_info (game: str):
 #this is a function used for pulling game data,
 #as development grows, it will be moved to it's own file along with other game related functions.
    filtered = ["name_original", "background_image", "released", "updated", "website", "platforms", "stores", "tags", "description_raw"]
    slug = await game_search(game)
    GH = os.getenv("GH_KEY")
    url = f"https://api.rawg.io/api/games/{slug}?key={GH}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()
        #accessing the dictionary returned by data = response.json
        #checks my keys in filtered
        #if the key is in filtered and it exists in the data that its added
        filtered = {key: data[key] for key in filtered if key in data}
    return filtered
