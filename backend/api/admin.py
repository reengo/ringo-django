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
        styles = """
        <style>
        .EasyMDEContainer.mde-dark .CodeMirror,
        .EasyMDEContainer.mde-dark .CodeMirror-scroll {
            background: #1e293b !important;
            color: #e2e8f0 !important;
        }
        .EasyMDEContainer.mde-dark .CodeMirror-cursor {
            border-left-color: #e2e8f0 !important;
        }
        .EasyMDEContainer.mde-dark .CodeMirror-selected {
            background: #2d4a6e !important;
        }
        .EasyMDEContainer.mde-dark .CodeMirror-line::selection,
        .EasyMDEContainer.mde-dark .CodeMirror-line > span::selection {
            background: #2d4a6e !important;
        }
        .EasyMDEContainer.mde-dark .editor-toolbar {
            background: #0f172a !important;
            border-color: #334155 !important;
        }
        .EasyMDEContainer.mde-dark .editor-toolbar a,
        .EasyMDEContainer.mde-dark .editor-toolbar button {
            color: #94a3b8 !important;
        }
        .EasyMDEContainer.mde-dark .editor-toolbar a:hover,
        .EasyMDEContainer.mde-dark .editor-toolbar a.active {
            background: #1e293b !important;
            border-color: #475569 !important;
            color: #e2e8f0 !important;
        }
        .EasyMDEContainer.mde-dark .editor-toolbar i.separator {
            border-color: #334155 !important;
        }
        .EasyMDEContainer.mde-dark .editor-preview,
        .EasyMDEContainer.mde-dark .editor-preview-side {
            background: #0f172a !important;
            color: #e2e8f0 !important;
            border-color: #334155 !important;
        }
        .EasyMDEContainer.mde-dark .editor-statusbar {
            color: #64748b !important;
            border-color: #334155 !important;
        }
        .EasyMDEContainer.mde-dark {
            border-color: #334155 !important;
        }
        .EasyMDEContainer.mde-dark .CodeMirror-placeholder {
            color: #475569 !important;
        }
        </style>
        """
        script = f"""
        <script>
        document.addEventListener('DOMContentLoaded', function() {{
            var el = document.getElementById('{widget_id}');
            if (!el || typeof EasyMDE === 'undefined') return;

            var mde = new EasyMDE({{
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

            var container = mde.element.closest('.EasyMDEContainer') || mde.codemirror.getWrapperElement().parentElement;

            function isDarkMode() {{
                var theme = document.documentElement.dataset.theme;
                if (theme === 'dark') return true;
                if (theme === 'light') return false;
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }}

            function applyTheme() {{
                container.classList.toggle('mde-dark', isDarkMode());
            }}

            applyTheme();

            // Watch for Django admin theme toggle (changes data-theme attribute)
            new MutationObserver(applyTheme).observe(document.documentElement, {{
                attributes: true, attributeFilter: ['data-theme']
            }});

            // Watch for OS-level preference changes (handles "auto" mode)
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
        }});
        </script>
        """
        return mark_safe(html + styles + script)


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
    prepopulated_fields = {'slug': ('title',)}
    fields        = ('title', 'slug', 'excerpt', 'content', 'published_at', 'is_published')
