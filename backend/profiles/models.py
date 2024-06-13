from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

GENDER_CHOICES = (
    ('male', 'Male'),
    ('female', 'Female'),
)

class Profile(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    birthdate = models.DateField()
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default='male')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} ({self.owner})'
