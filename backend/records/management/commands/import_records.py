import csv
from typing import Any
from django.core.management.base import BaseCommand, CommandParser
from datetime import datetime
from records.models import Record
from profiles.models import Profile

class Command(BaseCommand):
    help =  'Import records from CSV'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the CSV file')
        parser.add_argument('profile_id', type=str, help='Profile ID to associate the records')
    
    def handle(self, *args, **options):
        file_path = options['file_path']
        profile_id = options['profile_id']

        try:
            profile = Profile.objects.get(pk=profile_id)
        except Profile.DoesNotExist:
            self.stdout.write(self.style.ERROR("Profile does not exist. Please provide a valid profile ID."))
            return

        with open(file_path, 'r') as file:
            reader = csv.reader(file)
            next(reader) # Skip header if present
            for row in reader:
                # Map the CSV columns to the corresponding Record model fields
                profile_id = 1
                date = datetime.strptime(row[0], '%m/%d/%Y').date()
                height = float(row[1].replace('cm',''))
                weight = float(row[2].replace('kg',''))
                bmi = float(row[3])
                muscle = float(row[4].replace('%',''))
                body_fat = float(row[6].replace('%',''))
                visceral = int(row[8])
                calories = int(row[9])
                metabolic_age = int(row[10].replace(' años',''))

                record = Record(
                    date=date,
                    height=height,
                    weight=weight,
                    bmi=bmi,
                    muscle=muscle,
                    bodyFat=body_fat,
                    visceral=visceral,
                    calories=calories,
                    metabolicAge=metabolic_age,
                    profile=profile,
                )

                record.save()

        self.stdout.write("Records imported successfully!")



# INSTRUCTIONS
# RUN WITH PATH TO CSV FILE AND THEN PROFILE ID
# python manage.py import_records /path/to/your/data.csv 1