from django.contrib import admin
from .models import Post
import os

admin.site.site_url = os.environ.get('SITE_MAIN')


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_at', 'is_published')
    list_filter = ('is_published',)
    search_fields = ('title', 'excerpt', 'content')
    list_editable = ('is_published',)

    def get_readonly_fields(self, request, obj=None):
        # published_at is auto_now_add — only show it when editing an existing post
        if obj:
            return ('published_at',)
        return ()

    def get_fields(self, request, obj=None):
        if obj:
            return ('title', 'excerpt', 'content', 'is_published', 'published_at')
        return ('title', 'excerpt', 'content', 'is_published')