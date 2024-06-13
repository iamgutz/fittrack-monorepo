from django.db import models
from profiles.models import Profile

class Record(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profileRecords')
    date = models.DateField()
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    bmi = models.DecimalField(max_digits=3, decimal_places=1)
    bodyFat = models.DecimalField(max_digits=4, decimal_places=2)
    muscle = models.DecimalField(max_digits=4, decimal_places=2)
    visceral = models.IntegerField()
    calories = models.IntegerField()
    metabolicAge = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}({self.profile}) date={self.date} weight={self.weight} bmi={self.bmi}'
    
    def calculate_muscle_kg(self):
        return self.weight * (self.muscle / 100)
    
    def calculate_body_fat_kg(self):
        return self.weight * (self.bodyFat / 100)