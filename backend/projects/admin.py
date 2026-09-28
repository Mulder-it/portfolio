from django.contrib import admin

from .models import Project, Technology

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ["name", "category"]
    list_filter = ["category"]

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "status", "is_published", "order"]
    list_filter = ["status", "is_published"]
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ["technologies",]

