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
from django.shortcuts import get_object_or_404


# Django imports


def index(request):
    return HttpResponse("This is the start of something great!")

#Going to be making CRUD related functions, already finished the create function


# Create a user profile
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

#delete user function
def delete_user(request):
    try:
        if request.method != 'DELETE':
         return HttpResponse("This function is only for DELETE methods", status = 400)
        
        data = json.loads(request.body) #loading in the request information which is the account that is meant to be deleted.

        if(User.objects.filter(username=data.get("userName"))).exists():
            User.objects.filter(username=data.get("userName")).delete()
            return HttpResponse("Deleted user successfully", status=200)
        
        return JsonResponse("No user was found", status=404)
    except Exception as e:
        raise HttpResponse(str(e), status=400)
    

#Update User Function

def update_user(request):
    try:
        if request.method != 'PATCH':
            return HttpResponse("This function is only for PATCH methods", status = 400)
        data = json.loads(request.body)
        user = get_object_or_404(User, id=data.get("id")) #checks to see if the user even exists, if not then throws a 404 error
    #updating each necessary field.
        if 'userName' in data:
            user.username = data.get("userName") 
        if 'firstName' in data:
            user.first_name = data.get("firstName")
        if 'lastName' in data:
            user.last_name = data.get("lastName")
        if 'email' in data:
         user.email = data.get("email")

        user.save() #saving the model. 
        return HttpResponse("Updated successfully", status=200)
    except Exception as e:
       return HttpResponse(str(e), status=400)
    #Once I develop the frontend a bit more, will add more fields like favorite game, profile photo etc.
    #Will write a password validation check function later, this function will require the user to enter their password, they must correctly enter it in order to change their current password.

    

