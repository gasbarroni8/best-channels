# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-04 07:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inner', '0004_auto_20170701_1500'),
    ]

    operations = [
        migrations.AddField(
            model_name='inner',
            name='thumbnail',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
