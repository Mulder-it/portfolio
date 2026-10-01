from unicodedata import category

from django.template.defaultfilters import title
from django.test import TestCase

import pytest
from .models import Project, Technology

@pytest.fixture
def django_tech():
    return Technology.objects.create(name="Django", category=Technology.Category.FRAMEWORK)

@pytest.fixture
def published_project(django_tech):
    project = Project.objects.create(
        title="Test API",
        slug="test-api",
        summary="A test project",
        description="A longer description for testing.",
        is_published=True,
    )
    project.technologies.add(django_tech)
    return project

@pytest.fixture
def unpublished_project():
    return Project.objects.create(
        title=("Draft project"),
        slug="draft-project",
        summary="Not ready yet",
        description="Still in progress.",
        is_published=False,
    )

@pytest.mark.django_db
class TestModels:
    def test_technology_str(self, django_tech):
        assert str(django_tech) == "Django"

    def test_project_str(self, published_project):
        assert str(published_project) == "Test API"

@pytest.mark.django_db
class TestProjectsApi:
    def test_list_returns_only_published(self, client, published_project,unpublished_project):
        response = client.get("/api/projects")
        assert response.status_code == 200
        slugs = [item["slug"] for item in response.json()]
        assert "test-api" in slugs
        assert "draft-project" not in slugs

    def test_list_includes_technologies(self, client, published_project):
        response = client.get("/api/projects")
        data = response.json()[0]
        assert data["technologies"][0]["name"] == "Django"

    def test_detail_return_published_project(self, client, published_project):
        response = client.get(f"/api/projects/{published_project.slug}")
        assert response.status_code == 200
        assert response.json()["title"] == "Test API"

    def test_detail_404_for_unpublished(self, client, unpublished_project):
        response = client.get(f"/api/projects/{unpublished_project.slug}")
        assert response.status_code == 404

    def test_detail_404_for_unknown_slug(self, client):
        response = client.get("/api/projects/does-not-exist")
        assert response.status_code == 404


