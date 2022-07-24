from django.urls import path

from . import views
app_name = 'player'

urlpatterns = [
    path('', views.main, name='main'),
    path('datasetHelp', views.datasetHelp, name='datasetHelp'),
    path('extractHighlight', views.extractHighlight, name='extractHighlight'),
    path('getHandball', views.getHandball, name='getHandball'),
    path('extractFrames', views.extractFrames, name='extractFrames'),
    path('highlight_<int:highlight_id>',views.viewHighlight,name='viewHighlight'),
]