# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-22 11:12
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('playlist', '0004_auto_20170622_1022'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='name',
        ),
    ]
