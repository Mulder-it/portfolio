from unittest.mock import Mock, patch

import pytest
import requests
from django.test import override_settings

from .models import ContactMessage
from .turnstile import verify_turnstile

VALID = {
    "name": "Alice",
    "email": "alice@example.com",
    "message": "Bonjour, ceci est un message assez long",
    "turnstile_token": "XXXX.DUMMY.TOKEN.XXXX",
}

@pytest.fixture(autouse=True)
def turnstile_ok(monkeypatch):
    monkeypatch.setattr("contact.api.verify_turnstile", lambda token: True)

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

    def test_missing_token_is_rejected(self, client):
        data = {key: value for key, value in VALID.items() if key != "turnstile_token"}
        response = client.post("/api/contact", data, content_type="application/json")
        assert response.status_code == 422
        assert ContactMessage.objects.count() == 0

    def test_invalid_token_is_rejected(self, client, monkeypatch):
        monkeypatch.setattr("contact.api.verify_turnstile", lambda token: False)
        response = client.post("/api/contact", VALID, content_type="application/json")
        assert response.status_code == 400
        assert ContactMessage.objects.count() == 0

    def test_too_many_message_are_throttled(self, client):
        for _ in range(5):
            response = client.post("/api/contact", VALID, content_type="application/json")
            assert response.status_code == 201
        response = client.post("/api/contact", VALID, content_type="application/json")
        assert response.status_code == 429
        assert ContactMessage.objects.count() == 5

class TestVerifyTurnstile:
    @override_settings(TURNSTILE_SECRET_KEY="secret")
    def test_success_response_is_accepted(self):
        with patch("contact.turnstile.requests.post") as post:
            post.return_value = Mock(
                json=lambda: {"success": True}, raise_for_status=lambda: None
            )
            assert verify_turnstile("token") is True

    @override_settings(TURNSTILE_SECRET_KEY="secret")
    def test_failure_response_is_refused(self):
        with patch("contact.turnstile.requests.post") as post:
            post.return_value = Mock(
                json=lambda: {"success": False}, raise_for_status=lambda: None
            )
            assert verify_turnstile("token") is False

    @override_settings(TURNSTILE_SECRET_KEY="secret")
    def test_network_error_is_refused(self):
        with patch("contact.turnstile.requests.post", side_effect=requests.ConnectionError):
            assert verify_turnstile("token") is False

    @override_settings(TURNSTILE_SECRET_KEY="")
    def test_missing_secret_is_refused_without_calling_cloudflare(self):
        with patch("contact.turnstile.requests.post") as post:
            assert verify_turnstile("token") is False
            post.assert_not_called()