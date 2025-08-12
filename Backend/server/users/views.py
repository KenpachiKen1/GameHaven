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
#Will add specific

# Create your views here.

def index(request):
    return HttpResponse("This is the start of something great!")


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