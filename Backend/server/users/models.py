from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    #Abstract user already has Username, and also has automatic password hashing.
    profile_photo = models.ImageField(upload_to="Profile_Photos/", editable=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True) #for one the user is actually created
    last_modified = models.DateTimeField(auto_now=True) #for whenever the user is updated
    game_catalog = models.ImageField(upload_to="Games_List/", blank=True, null=True, editable=True)
    favorite_game = models.ForeignKey('games.Game', on_delete=models.CASCADE, null=True, blank=True)
    avg_hours_week = models.IntegerField(null=True, blank=True, editable=True)
    main_platform = models.CharField(editable=True, blank=True, null=True, max_length=250)


    def __str__(self):
        return f"username: {self.username} password: {self.password}, email: {self.email}, first name: {self.first_name}, last name: {self.last_name}"

