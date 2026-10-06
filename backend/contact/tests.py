import pytest

from .models import ContactMessage

VALID = {
    "name": "Alice",
    "email": "alice@example.com",
    "message": "Bonjour, ceci est un message assez long",
}

@pytest.mark.django_db
class TestContactApi:
    def test_valid_message_is_saved(self, client):
        response = client.post("/api/contact", VALID, content_type="application/json")
        assert response.status_code == 201
        assert ContactMessage.objects.count() == 1

    def test_invalid_message_is_rejected(self, client):
        data = {**VALID, "email": "not-an-email"}
        response = client.post("/api/contact", data, content_type="application/json")
        assert response.status_code == 422
        assert ContactMessage.objects.count() == 0

    def test_honeypot_message_is_not_saved(self, client):
        data = {**VALID, "website": "http://spam.example"}
        response = client.post("/api/contact", data, content_type="application/json")
        assert response.status_code == 201
        assert ContactMessage.objects.count() == 0