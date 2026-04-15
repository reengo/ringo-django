from django.db import migrations, models
from django.utils.text import slugify


def populate_slugs(apps, schema_editor):
    Post = apps.get_model('api', 'Post')
    for post in Post.objects.all():
        base = slugify(post.title) or f"post-{post.pk}"
        slug = base
        n = 1
        while Post.objects.filter(slug=slug).exclude(pk=post.pk).exists():
            slug = f"{base}-{n}"
            n += 1
        post.slug = slug
        post.save(update_fields=['slug'])


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_post_published_at'),
    ]

    operations = [
        # Step 1: plain CharField — no slug index created yet
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.CharField(max_length=220, blank=True, null=True, default=''),
        ),
        # Step 2: fill slugs for existing rows
        migrations.RunPython(populate_slugs, migrations.RunPython.noop),
        # Step 3: convert to proper SlugField with unique constraint
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(max_length=220, unique=True),
        ),
    ]
