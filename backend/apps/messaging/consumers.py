import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import Conversation, Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.conversation_id = self.scope["url_route"]["kwargs"]["conversation_id"]
        self.room_group_name = f"conversation_{self.conversation_id}"
        user = self.scope["user"]

        if not user.is_authenticated or not await self._is_participant(user.id):
            await self.close()
            return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        payload = json.loads(text_data)
        message = await self._create_message(self.scope["user"].id, payload["content"])

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat.message",
                "message": {
                    "id": message.id,
                    "content": message.content,
                    "sender_id": message.sender_id,
                    "created_at": message.created_at.isoformat(),
                },
            },
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event["message"]))

    @database_sync_to_async
    def _is_participant(self, user_id):
        return Conversation.objects.filter(id=self.conversation_id, participants__id=user_id).exists()

    @database_sync_to_async
    def _create_message(self, user_id, content):
        return Message.objects.create(conversation_id=self.conversation_id, sender_id=user_id, content=content)

