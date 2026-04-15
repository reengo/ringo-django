from django.contrib import admin
from django import forms
from django.utils.safestring import mark_safe
from .models import Post
import os


class EasyMDEWidget(forms.Textarea):
    """Markdown editor using EasyMDE loaded from CDN."""

    class Media:
        css = {'all': ('https://unpkg.com/easymde/dist/easymde.min.css',)}
        js  = ('https://unpkg.com/easymde/dist/easymde.min.js',)

    def render(self, name, value, attrs=None, renderer=None):
        html      = super().render(name, value, attrs, renderer)
        widget_id = (attrs or {}).get('id', f'id_{name}')
        script    = f"""
        <script>
        document.addEventListener('DOMContentLoaded', function() {{
            var el = document.getElementById('{widget_id}');
            if (el && typeof EasyMDE !== 'undefined') {{
                new EasyMDE({{
                    element: el,
                    spellChecker: false,
                    autosave: {{ enabled: false }},
                    toolbar: [
                        'bold', 'italic', 'heading', '|',
                        'quote', 'unordered-list', 'ordered-list', '|',
                        'link', 'image', 'code', 'horizontal-rule', '|',
                        'preview', 'side-by-side', 'fullscreen'
                    ],
                }});
            }}
        }});
        </script>
        """
        return mark_safe(html + script)


class PostAdminForm(forms.ModelForm):
    class Meta:
        model   = Post
        fields  = '__all__'
        widgets = {'content': EasyMDEWidget(attrs={'rows': 20})}


admin.site.site_url = os.environ.get('SITE_MAIN')


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    form         = PostAdminForm
    list_display = ('title', 'published_at', 'is_published')
    list_filter  = ('is_published',)
    search_fields = ('title', 'excerpt', 'content')
    list_editable = ('is_published',)
    fields        = ('title', 'excerpt', 'content', 'published_at', 'is_published')
