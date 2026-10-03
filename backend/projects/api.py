from django.shortcuts import get_object_or_404
from ninja import Router
from .models import Project, Technology
from .schemas import ProjectDetailSchema, ProjectListSchema, TechnologySchema

router = Router(tags=["projects"])
technologies_router = Router(tags=["technologies"])

@router.get("", response=list[ProjectListSchema])
def list_projects(request):
    return Project.objects.filter(is_published=True).prefetch_related("technologies")

@router.get("/{slug}", response=ProjectDetailSchema)
def get_project(request, slug: str):
    return get_object_or_404(Project.objects.prefetch_related("technologies"), slug=slug, is_published=True,)

@technologies_router.get("", response=list[TechnologySchema])
def list_technologies(request):
    return Technology.objects.all()