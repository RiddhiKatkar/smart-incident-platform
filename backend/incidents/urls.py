from django.urls import path
from .views import (
    incident_list_create,
    incident_delete,
    admin_incident_list
)

urlpatterns = [
    path("incidents/", incident_list_create),
    path("incidents/<int:pk>/", incident_delete),
    path("admin/incidents/", admin_incident_list),
]
