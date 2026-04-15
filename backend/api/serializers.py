from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Post
import markdown as md

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
    date         = serializers.SerializerMethodField()
    content_html = serializers.SerializerMethodField()

    class Meta:
        model  = Post
        fields = ['id', 'title', 'excerpt', 'content', 'content_html', 'date', 'published_at']

    def get_date(self, obj):
        return obj.published_at.strftime('%b %d, %Y')

    def get_content_html(self, obj):
        return md.markdown(obj.content, extensions=['extra', 'nl2br'])