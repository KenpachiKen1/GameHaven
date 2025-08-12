from django.db import models

# Create your models here.

class Platform (models.Model):
    platform = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.platform}"

class Tags(models.Model):
    tags = models.CharField(max_length=75, unique=True)

    def __str__(self):
        return f"{self.tags}"

class Game(models.Model):
    name = models.CharField(unique=True, null=False, blank=False, max_length=200, editable=True) #name of the game
    released = models.DateField(blank=True, null=True) #The game's release date
    website = models.URLField(max_length = 500, editable=True, null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True, editable=True) #description
    game_image = models.URLField(null=True, max_length=500, editable=True, blank=True)
    platform = models.ManyToManyField(Platform, blank=True) #Each game can be linked to multiple platforms if needed.
    store = models.URLField(null=True, max_length=200, editable=True, blank=True)
    tags = models.ManyToManyField(Tags, blank=True) #The Tags associated with each game

    def __str__(self):
        return f"Game: {self.name}, release date: {self.released}, \n description: {self.description}"
