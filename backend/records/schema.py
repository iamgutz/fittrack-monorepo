import graphene
from graphene_django import DjangoObjectType
from decimal import Decimal
from datetime import datetime
from django.contrib.auth import get_user_model
from django.db.models import Max, Min
from profiles.models import Profile
from .models import Record

User = get_user_model()

class RecordType(DjangoObjectType):
    class Meta:
        model = Record
        fields = '__all__'
    
    body_fat_kg = graphene.Float()
    muscle_kg = graphene.Float()

    def resolve_body_fat_kg(self, info):
        # Rounds to 2 decimal places
        return round(self.calculate_body_fat_kg(), 2)
    
    def resolve_muscle_kg(self, info):
        # Rounds to 2 decimal places
        return round(self.calculate_muscle_kg(), 2)

class PieChartType(graphene.ObjectType):
    name = graphene.String()
    value = graphene.Float()

class LatestVariationsType(graphene.ObjectType):
    bodyFat = graphene.Float()
    bodyFatKg = graphene.Float()
    muscle = graphene.Float()
    muscleKg = graphene.Float()
    weight = graphene.Float()

class StatsType(graphene.ObjectType):
    dateFirst = graphene.Date()
    dateLast = graphene.Date()
    daysPassed = graphene.Int()
    heightDiff = graphene.Float()
    weightDiff = graphene.Float()
    muscleDiff = graphene.Float()
    muscleKgDiff = graphene.Float()
    bodyFatDiff = graphene.Float()
    bodyFatKgDiff = graphene.Float()
    visceralDiff = graphene.Int()
    bmiDiff = graphene.Float()
    metabolicAgeDiff = graphene.Int()
    caloriesDiff = graphene.Int()
    latestVariations = graphene.Field(LatestVariationsType)
    pieChart = graphene.List(PieChartType)
    lineChart = graphene.List(RecordType)

class Query(graphene.ObjectType):
    records = graphene.List(RecordType, profileId=graphene.ID(required=True), sortBy=graphene.String(), order=graphene.String())
    stats = graphene.Field(StatsType, profileId=graphene.ID(required=True), startDate=graphene.String(), endDate=graphene.String())

    def resolve_records(self, info, profileId, sortBy='date', order='asc'):
        try:
            profile = Profile.objects.get(pk=profileId)
        except Profile.DoesNotExist:
            raise Exception('Profile not found')
        
        records = Record.objects.filter(profile=profile)

        # Apply sorting
        order_by = f'{sortBy}' if order == 'asc' else f'-{sortBy}'

        return records.order_by(order_by)
    
    def resolve_stats(self, info, profileId, startDate=None, endDate=None):
        try:
            profile = Profile.objects.get(pk=profileId)
        except Profile.DoesNotExist:
            raise Exception('Profile not found')
        
        start_date = datetime.strptime(startDate, '%Y-%m-%d').date() if startDate else datetime.now().date()
        end_date = datetime.strptime(endDate, '%Y-%m-%d').date() if endDate else datetime.now().date()

        records = Record.objects.filter(profile=profile)
        all_records = records

        if start_date:
            records = records.filter(date__gte=start_date)
        
        if end_date:
            records = records.filter(date__lte=end_date)

        # Use Django's aggregation to get the first and last record within the date range
        aggregated_data = records.aggregate(first_record=Min('date'), last_record=Max('date'))
        first_record_date = aggregated_data['first_record']
        last_record_date = aggregated_data['last_record']
        
        # Now fetch the first and last record based on the dates
        first_record = records.filter(date=first_record_date).first()
        last_record = records.filter(date=last_record_date).first()
        
    
        days_passed = (last_record_date - first_record_date).days if first_record_date and last_record_date else 0
        height_diff = last_record.height - first_record.height if last_record and first_record else 0
        weight_diff = last_record.weight - first_record.weight if last_record and first_record else 0
        muscle_diff = last_record.muscle - first_record.muscle if last_record and first_record else 0
        muscle_kg_diff = round(last_record.calculate_muscle_kg() - first_record.calculate_muscle_kg(), 2) if last_record and first_record else 0
        bodyFat_diff = last_record.bodyFat - first_record.bodyFat if last_record and first_record else 0
        bodyFat_kg_diff = round(last_record.calculate_body_fat_kg() - first_record.calculate_body_fat_kg(), 2) if last_record and first_record else 0
        visceral_diff = last_record.visceral - first_record.visceral if last_record and first_record else 0
        bmi_diff = last_record.bmi - first_record.bmi if last_record and first_record else 0
        metabolicAge_diff = last_record.metabolicAge - first_record.metabolicAge if last_record and first_record else 0
        calories_diff = last_record.calories - first_record.calories if last_record and first_record else 0

        # latest 2 records from today backwards
        latest_records = all_records.filter(date__lte=datetime.now().date()).order_by('-date')[:2]
        first_variation = latest_records[1]
        last_variation = latest_records[0]

        latest_variations = {
            'bodyFat': last_variation.bodyFat - first_variation.bodyFat if latest_records else 0,
            'bodyFatKg': round(last_variation.calculate_body_fat_kg() - first_variation.calculate_body_fat_kg(), 2) if latest_records else 0,
            'muscle': last_variation.muscle - first_variation.muscle  if latest_records else 0,
            'muscleKg': round(last_variation.calculate_muscle_kg() - first_variation.calculate_muscle_kg(), 2) if latest_records else 0,
            'weight': round(last_variation.weight - first_variation.weight, 2) if latest_records else 0,
        }

        pie_chart = [
            { 'name': 'muscle', 'value': last_variation.muscle if last_variation else 0, },
            { 'name': 'bodyFat', 'value': last_variation.bodyFat if last_variation else 0, },
            { 'name': 'other', 'value': 100 - (last_variation.muscle + last_variation.bodyFat) if last_variation else 0, },
        ]

        # The `line_chart` variable is used to fetch the latest 10 records from the database and order
        # them by date in descending order. These records are then returned as a list of `RecordType`
        # objects. This data can be used to create a line chart to visualize the changes in the
        # recorded data over time.
        last_10_records = all_records.filter(date__lte=datetime.now().date()).order_by('-date')[:10]
        line_chart = sorted(last_10_records, key=lambda record: record.date)

        return StatsType(
            dateFirst=first_record_date,
            dateLast=last_record_date,
            daysPassed=days_passed,
            heightDiff=height_diff,
            weightDiff=weight_diff,
            muscleDiff=muscle_diff,
            muscleKgDiff=muscle_kg_diff,
            bodyFatDiff=bodyFat_diff,
            bodyFatKgDiff=bodyFat_kg_diff,
            visceralDiff=visceral_diff,
            bmiDiff=bmi_diff,
            metabolicAgeDiff=metabolicAge_diff,
            caloriesDiff=calories_diff,
            latestVariations=latest_variations,
            pieChart=pie_chart,
            lineChart=line_chart,
        )


class CreateRecord(graphene.Mutation):
    class Arguments:
        profileId = graphene.ID(required=True)
        date = graphene.Date(required=True)
        height = graphene.Decimal(required=True)
        weight = graphene.Decimal(required=True)
        bmi = graphene.Decimal()
        bodyFat = graphene.Decimal()
        muscle = graphene.Decimal()
        visceral = graphene.Int()
        calories = graphene.Int()
        metabolicAge = graphene.Int()
    
    record = graphene.Field(RecordType)

    def mutate(
        self, info, profileId, date, height, weight,
        bmi, bodyFat, muscle, visceral, calories, metabolicAge,
    ):
        try:
            profile = Profile.objects.get(pk=profileId)
        except Profile.DoesNotExist:
            raise Exception('Profile not found')

        record = Record(
            profile=profile,
            date=date,
            height=height,
            weight=weight,
            bmi=bmi,
            bodyFat=bodyFat,
            muscle=muscle,
            visceral=visceral,
            calories=calories,
            metabolicAge=metabolicAge,
        )
        record.save()
        return CreateRecord(record=record)
    
class UpdateRecord(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        date = graphene.Date()
        height = graphene.Decimal()
        weight = graphene.Decimal()
        bmi = graphene.Decimal()
        bodyFat = graphene.Decimal()
        muscle = graphene.Decimal()
        visceral = graphene.Int()
        calories = graphene.Int()
        metabolicAge = graphene.Int()

    record = graphene.Field(RecordType)

    def mutate(
        self, info, id, date=None, height=None, weight=None, bmi=None,
        bodyFat=None, muscle=None, visceral=None, calories=None, metabolicAge=None,
    ):
        try:
            record = Record.objects.get(pk=id)
        except Record.DoesNotExist:
            raise Exception('Record not found')
        
        if date is not None:
            record.date = date
        if height is not None:
            record.height = Decimal(str(round(height, 2)))
        if weight is not None:
            record.weight = Decimal(str(round(weight, 2)))
        if bmi is not None:
            record.bmi = bmi
        if bodyFat is not None:
            record.bodyFat = Decimal(str(round(bodyFat, 2)))
        if muscle is not None:
            record.muscle = Decimal(str(round(muscle, 2)))
        if visceral is not None:
            record.visceral = visceral
        if calories is not None:
            record.calories = calories
        if metabolicAge is not None:
            record.metabolicAge = metabolicAge
        
        record.save()
        print(record.bodyFat)
        return UpdateRecord(record=record)

class DeleteRecord(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        try:
            record = Record.objects.get(pk=id)
        except Record.DoesNotExist:
            raise Exception('Record not found')
        
        record.delete()
        return DeleteRecord(success=True)

class Mutation(graphene.ObjectType):
    createRecord = CreateRecord.Field()
    updateRecord = UpdateRecord.Field()
    deleteRecord = DeleteRecord.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)