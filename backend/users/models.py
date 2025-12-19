from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


class Incident(models.Model):
    SEVERITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    reported_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reported_incidents"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
