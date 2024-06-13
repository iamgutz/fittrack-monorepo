from django.contrib import admin
from .models import Profile

class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'gender',
        'birthdate',
        'updatedAt',
    )

admin.site.register(Profile, ProfileAdmin)
