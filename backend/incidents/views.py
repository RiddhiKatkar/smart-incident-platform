from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Incident
from .serializers import IncidentSerializer

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def incident_list_create(request):
    if request.method == "GET":
        incidents = request.user.incidents.all()
        serializer = IncidentSerializer(incidents, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = IncidentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def incident_delete(request, pk):
    try:
        incident = Incident.objects.get(pk=pk, user=request.user)
    except Incident.DoesNotExist:
        return Response(
            {"detail": "Incident not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    incident.delete()
    return Response(
        {"message": "Incident deleted successfully"},
        status=status.HTTP_204_NO_CONTENT
    )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_incident_list(request):
    if not request.user.is_staff:
        return Response(
            {"detail": "Not authorized"},
            status=status.HTTP_403_FORBIDDEN
        )

    incidents = Incident.objects.all()
    serializer = IncidentSerializer(incidents, many=True)
    return Response(serializer.data)
