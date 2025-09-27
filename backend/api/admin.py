from django.contrib import admin
import os

admin.site.site_url = os.environ.get('SITE_MAIN')