from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static
app_name = 'pages'

urlpatterns = [
    path('', views.index, name='index'),
    path('clearStorage', views.clearStorage, name='clearStorage'),
    path('uploadVideo', views.uploadVideo, name='uploadVideo'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
