from ninja import Router, Status
from ninja.throttling import AnonRateThrottle
from .models import ContactMessage
from .schemas import ContactIn, ContactOut
from .turnstile import verify_turnstile

router = Router(tags=['contact'])

@router.post(
    "",
    response={201: ContactOut, 400: ContactOut},
    throttle=[AnonRateThrottle("5/h")])
def send_message(request, payload: ContactIn):
    if payload.website:
        return Status(201, {"detail": "Message envoyé."})

    if not verify_turnstile(payload.turnstile_token):
        return Status(400, {"detail": "Vérification anti-spam échouée."})

    ContactMessage.objects.create(
        name=payload.name,
        email=payload.email,
        message=payload.message,
    )
    return Status(201,{"detail": "Message envoyé"})



