from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create_user/', views.create_user, name='create_user'),
    path('finish_user/', views.set_user_hours_platform, name='set_user_hours_platform'),
]