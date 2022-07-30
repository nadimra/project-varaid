from django.template import Library
from VarAid.settings import MEDIA_URL
import os
import glob

register = Library()

@register.simple_tag
def media_url():
    return MEDIA_URL

@register.simple_tag
def get_num_highlights():
    path = './'+MEDIA_URL+'highlights/'
    fileList = os.listdir(path) 
    return range(len(fileList))

@register.simple_tag
def get_num_sectors_dataset(match):
    path = '../project/DatasetCollection/PlayerVids/HR/match{}/'.format(match)
    fileList = os.listdir(path) 
    return range(len(fileList))

@register.simple_tag
def has_uploaded_broadcast():
    path = './'+MEDIA_URL+'main/*.mp4'
    fileList = glob.glob(path)
    if(len(fileList)>0):
        return True
    else:
        return False

@register.simple_tag
def get_uploaded_broadcast():
    path = './'+MEDIA_URL+'main/*.mp4'
    fileList = glob.glob(path)
    vidFile = fileList[0]
    name = os.path.basename(vidFile)
    return MEDIA_URL+'main/'+name

@register.simple_tag
def get_uploaded_broadcast_glob():
    path = './'+MEDIA_URL+'main/*.mp4'
    fileList = glob.glob(path)
    return fileList[0]


# @register.simple_tag
# def get_highlight_path():
#     highlight_id = 2
#     highlightName = 'highlight_'+str(highlight_id)
#     highlightPath = '.'+MEDIA_URL+'highlights/'+highlightName
#     highlightOut = highlightPath+'/'+highlightName +'.mp4'
#     fileList = glob.glob(highlightOut)
#     return fileList[0]

@register.filter
def get_current_page(path):
    path = path.strip('/')
    pathArr = path.split('/')
    last = pathArr[-1]
    if last == 'player':
        return 0
    else:
        return int(last)

