from django.db import models

class Technology(models.Model):
    class Category(models.TextChoices):
        LANGUAGE = "language", "Langage"
        FRAMEWORK = "framework", "Framework & librairie"
        TOOL = "tool", "Outil & méthodologie"

    name = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=20, choices=Category.choices)

    class Meta:
        ordering = ["category", "name"]
        verbose_name_plural = "technologies"

    def __str__(self):
        return self.name

class Project(models.Model):
    class Status(models.TextChoices):
        IN_PROGRESS = "in_progress", "En cours"
        COMPLETED = "completed", "Terminé"

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    summary = models.CharField(max_length=300)
    description = models.TextField()
    technologies = models.ManyToManyField(Technology, related_name="projects", blank=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.IN_PROGRESS)
    is_published = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title

