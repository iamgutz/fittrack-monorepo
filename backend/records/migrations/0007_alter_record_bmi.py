# Generated by Django 4.2.6 on 2023-12-10 16:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("records", "0006_alter_record_bmi"),
    ]

    operations = [
        migrations.AlterField(
            model_name="record",
            name="bmi",
            field=models.DecimalField(decimal_places=1, max_digits=3),
        ),
    ]