from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('game/<str:game_name>/', views.game_details, name='game_details'),
    path('game/user_favs/<str:game_name>/', views.set_fav_game, name='set_fav_game')
]
