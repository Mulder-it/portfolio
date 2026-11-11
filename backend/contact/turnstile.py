import requests
from django.conf import settings

VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

def verify_turnstile(token: str)-> bool:
    if not settings.TURNSTILE_SECRET_KEY or not token:
        return False
    try:
        response = requests.post(
            VERIFY_URL,
            data={"secret": settings.TURNSTILE_SECRET_KEY, "response": token},
            timeout=5,
        )
        response.raise_for_status()
        return response.json().get("success") is True
    except (requests.RequestException, ValueError):
        return False

