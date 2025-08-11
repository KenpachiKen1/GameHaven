from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Root of GameHaven
    path('game/<str:game_name>/', views.game_details, name='game_details'),  # Game details
]
#django uses <> notation instead of {} like flask or fastapi