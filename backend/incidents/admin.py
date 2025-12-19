from django.contrib import admin
from .models import Incident

@admin.register(Incident)
class IncidentAdmin(admin.ModelAdmin):
    list_display = ("title", "severity", "user", "created_at")
    list_filter = ("severity",)
    search_fields = ("title", "description")

