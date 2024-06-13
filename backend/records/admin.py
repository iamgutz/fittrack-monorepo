from django.contrib import admin
from .models import Record

class RecordAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'profile',
        'date',
        'weight',
        'bodyFat',
        'muscle',
        'updatedAt',
    )

admin.site.register(Record, RecordAdmin)