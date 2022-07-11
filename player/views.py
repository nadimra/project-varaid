from django.shortcuts import render,redirect
from django.http import HttpResponse
from . import data_script
from templatetags import mytags
from VarAid.settings import MEDIA_URL
import glob

def main(request):
    return render(request,'player/main.html')

def datasetHelp(request):
    return render(request,'player/datasetHelp.html')

def extractHighlight(request):
    if request.method == 'GET':
        # Get corner points of image
        currentTime = float(request.GET['currentTime'])
        cropTop = int(float(request.GET['cropTop']))
        cropBottom = int(float(request.GET['cropBottom']))
        cropLeft = int(float(request.GET['cropLeft']))
        cropRight = int(float(request.GET['cropRight']))
        croppedImg = [cropTop,cropBottom,cropLeft,cropRight]

        frameNum = int(float(float(currentTime)*float(60)))
        
        # Determine frame path
        videoFile = mytags.get_uploaded_broadcast_glob()
        numHighlights = len(mytags.get_num_highlights()) + 1
        highlightName = 'highlight_'+str(numHighlights)
        highlightPath = '.'+MEDIA_URL+'highlights/'+highlightName
        highlightPathFrames = highlightPath+'/frames'
        highlightOut = highlightPath+'/'+highlightName +'.mp4'
        highlightOutTemp = highlightPath+'/'+highlightName +'2.mp4'

        # Save files
        data_script.mkdirs(highlightPathFrames)
        data_script.extract_frames_specific(videoFile,highlightPathFrames,frameNum,240,croppedImg)
        data_script.combine_frames(highlightPathFrames,highlightOut,highlightOutTemp,60)
        return HttpResponse(numHighlights) # Sending an success response
    else:
        return HttpResponse("Request method is not a GET")

def extractFrames(request):
    if request.method == 'GET':
        currentTime = float(request.GET['currentTime'])
        cropTop = int(float(request.GET['cropTop']))
        cropBottom = int(float(request.GET['cropBottom']))
        cropLeft = int(float(request.GET['cropLeft']))
        cropRight = int(float(request.GET['cropRight']))
        croppedImg = [cropTop,cropBottom,cropLeft,cropRight]
        frameNum = int(float(float(currentTime)*float(60)))

        videoFile = mytags.get_uploaded_broadcast_glob()
        match ='035'
        numSectors = len(mytags.get_num_sectors_dataset(match)) + 1
        print(numSectors)
        savePath = '../project/DatasetCollection/PlayerVids/HR/match{}/{:04}'.format(match,numSectors)
        data_script.mkdirs(savePath)
        data_script.extract_frames_specific(videoFile,savePath,frameNum,8,croppedImg)
        #data_script.combine_frames(highlightPathFrames,highlightOut,60)
        return HttpResponse(numSectors) # Sending an success response
    else:
        return HttpResponse("Request method is not a GET")

def viewHighlight(request,highlight_id):
    highlightName = 'highlight_'+str(highlight_id)
    highlightPath = '.'+MEDIA_URL+'highlights/'+highlightName
    highlightOut = highlightPath+'/'+highlightName +'.mp4'
    context = {
        'highlightOut':highlightOut,
        'highlightId':highlight_id,
    }
    return render(request,'player/highlight.html',context)