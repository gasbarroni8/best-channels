# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-05-02 02:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlist', '0011_playlist_submit'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='description',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
