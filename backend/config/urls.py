from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from projects.api import router as project_router

api = NinjaAPI(title="Portfolio API", version="1.0.0")
api.add_router("/projects", project_router)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", api.urls),
]
