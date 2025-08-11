from django.contrib import admin
from django.urls import path, include
from .models import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('GameHaven/', include('GameHaven.urls')),  # Include GameHaven app URLs
    #this is the root of the GameHaven app, not the root of the project
]
# Register your models here.

admin.site.register(User)
admin.site.register(Game)
admin.site.register(Platform)
admin.site.register(Tags)
