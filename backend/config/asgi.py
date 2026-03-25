import os

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

from .routing import application as channels_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.dev")

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": channels_application["websocket"],
    }
)

