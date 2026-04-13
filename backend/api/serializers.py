from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}


class PostSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'excerpt', 'content', 'date', 'published_at']

    def get_date(self, obj):
        return obj.published_at.strftime('%b %d, %Y')