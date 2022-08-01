from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from . import data_script
from templatetags import mytags
from VarAid.settings import MEDIA_URL
import glob
from modules.handball_detection import main as handball_detector
from modules.vsr.codes import test as stvsr

MODEL_ZOO= {
    'ModelC':'./modules/vsr/ckpts/ModelC.pth',
    'ModelI':'./modules/vsr/ckpts/ModelI.pth',
    'ModelJ':'./modules/vsr/ckpts/ModelJ.pth',
    'ModelK':'./modules/vsr/ckpts/ModelK.pth',
    'ModelL':'./modules/vsr/ckpts/ModelL.pth',
}

def main(request):
    return render(request,'player/main.html')

def datasetHelp(request):
    return render(request,'player/datasetHelp.html')

def extractHighlight(request):
    if request.method == 'GET':
        # Get corner points of image
        fps = 30
        currentTime = float(request.GET['currentTime'])
        cropTop = int(float(request.GET['cropTop']))
        cropBottom = int(float(request.GET['cropBottom']))
        cropLeft = int(float(request.GET['cropLeft']))
        cropRight = int(float(request.GET['cropRight']))
        croppedImg = [cropTop,cropBottom,cropLeft,cropRight]

        frameNum = int(float(float(currentTime)*float(fps)))
        
        # Determine frame path
        videoFile = mytags.get_uploaded_broadcast_glob()
        numHighlights = len(mytags.get_num_highlights()) + 1
        highlightName = 'highlight_'+str(numHighlights)
        highlightPath = '.'+MEDIA_URL+'highlights/'+highlightName
        highlightPathFrames = highlightPath+'/frames'

        highlightOut = highlightPath+'/'+highlightName +'.mp4'
        highlightOutTemp = highlightPath+'/'+highlightName +'2.mp4'

        modelName = "ModelL"
        modelPath = MODEL_ZOO[modelName]

        # Save files
        data_script.mkdirs(highlightPathFrames)
        data_script.extract_frames_specific(videoFile,highlightPathFrames,frameNum,200,croppedImg)

        #stvsr.main(model_name=modelName,model_path=modelPath,test_dataset_folder=highlightPathFrames,save_folder=highlightPath)
        #vsrFrames = highlightPathFrames+'_vsr_{}'.format(modelName)
        #data_script.combine_frames(vsrFrames,highlightOut,highlightOutTemp,60)
        data_script.combine_frames(highlightPathFrames,highlightOut,highlightOutTemp,30)


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

def getHandball(request):
    if request.method == 'GET':
        highlight_url = str(request.GET['highlightUrl'])
        highlight_id = highlight_url.split("/")[-1]
        highlight_path = '.'+MEDIA_URL+'highlights/'+highlight_id+'/'+highlight_id+'.mp4'
        decision_path = '.'+MEDIA_URL+'decisions/'
        print(highlight_path)
        hit_hand,handball_decision,handball_part,handball_angle,msg = handball_detector.handball_detection(highlight_path,decision_path)
        data = {
            'handball_decision': handball_decision,
            'msg': msg
        }
    return JsonResponse(data)
