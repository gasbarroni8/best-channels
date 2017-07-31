# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-22 05:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recommend',
            name='checked',
            field=models.CharField(choices=[('N', 'New'), ('A', 'Added'), ('L', 'Not Good Enough'), ('I', 'Ignore'), ('O', 'Others')], default='N', max_length=5),
        ),
    ]
