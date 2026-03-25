from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import CustomerProfile, SavedSolicitor, User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ("email", "role", "email_verified", "is_staff")
    ordering = ("email",)
    fieldsets = DjangoUserAdmin.fieldsets + (
        ("Findasolicitor", {"fields": ("role", "phone", "address", "avatar", "terms_accepted", "email_verified")}),
    )
    add_fieldsets = DjangoUserAdmin.add_fieldsets + (
        ("Findasolicitor", {"fields": ("email", "role", "terms_accepted")}),
    )


admin.site.register(CustomerProfile)
admin.site.register(SavedSolicitor)
