
from django.shortcuts import render
from django.http import HttpResponse
from player import data_script
from django.core.files.storage import FileSystemStorage
from VarAid.settings import MEDIA_URL

def index(request):
    return render(request,'pages/index.html')

def clearStorage(request):
    if request.method == 'GET':
        data_script.remove_highlights()
        data_script.remove_broadcast()
        return HttpResponse("Done")
    return HttpResponse("Done")

def uploadVideo(request):
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']

        #Validation checks
        fail = False
        ext = myfile.name.split('.')[-1]
        uploaded_file_url = ""
        if ext != 'mp4':
            fail = True

        if not fail:
            data_script.remove_highlights()
            data_script.remove_broadcast()

            fs = FileSystemStorage()
            filename = fs.save('main/'+myfile.name, myfile)
            vidSize = data_script.check_video_size(fs.url(filename))
            if not vidSize:
                print("rescaling")
                data_script.rescale_video(fs.url(filename),myfile.name)
                data_script.remove_specific_file(fs.url(filename))
            uploaded_file_url = fs.url(filename)

        context = {
            'uploaded_file_url': uploaded_file_url,
            'fail': fail,
        }
        return render(request, 'pages/uploadVideo.html', context)
    return render(request,'pages/uploadVideo.html')
