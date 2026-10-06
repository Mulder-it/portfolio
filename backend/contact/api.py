from ninja import Router, Status
from .models import ContactMessage
from .schemas import ContactIn, ContactOut

router = Router(tags=['contact'])

@router.post("", response={201: ContactOut})
def send_message(request, payload: ContactIn):
    if not payload.website:
        ContactMessage.objects.create(
            name=payload.name,
            email=payload.email,
            message=payload.message,
        )
    return Status(201, {"detail": "Message envoyé."})