from .models import Inner
from rest_framework import serializers
from playlist.serializers import PlaylistSerializer


class InnerSerializer(serializers.ModelSerializer):
    playlist = PlaylistSerializer(many=True, read_only=True)
    outer = serializers.ReadOnlyField(source='outer.name')

    class Meta:
        model = Inner
        fields = ('id', 'name', 'outer', 'playlist',)
