import os
import cv2
from os.path import isfile, join
import re
import shutil
from VarAid.settings import MEDIA_URL

def mkdir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def mkdirs(paths):
    if isinstance(paths, str):
        mkdir(paths)
    else:
        for path in paths:
            mkdir(path)

def remove_highlights():
    folder = '.'+MEDIA_URL+'highlights'
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

def remove_broadcast():
    folder = '.'+MEDIA_URL+'main'
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))


def extract_frames_specific(pathIn, pathOut, start, max,croppedImg):
    vidcap = cv2.VideoCapture(pathIn)
    cnt=1
    vidcap.set(1, start-1)
    success, image = vidcap.read()
    print('Start to extract frames from {}.'.format(os.path.basename(pathIn)))
    while success and cnt<max:
        image = image[croppedImg[0]:croppedImg[1],croppedImg[2]:croppedImg[3]]
        # if crop!=(0,0):
        #     h, w, c = image.shape
        #     rWidth = crop[0]
        #     rHeight = crop[1]
        #     image = image[0:rHeight,0:rWidth]


        cv2.imwrite(join(pathOut, "{:06d}.png".format(cnt)), image)
        success, image = vidcap.read()
        cnt += 1
    print('Successfully extract {} frames from {}.'.format(
        cnt, os.path.basename(pathIn)))

def combine_frames(pathIn, pathOut, fps):
    frame_array = []
    files = [f for f in os.listdir(pathIn) if isfile(join(pathIn, f))]
    # for sorting the file names properly
    files.sort(key=lambda x: int(re.search(r'\d+', x).group()))
    for i in range(len(files)):
        filename = join(pathIn, files[i])
        # reading each files
        img = cv2.imread(filename)
        height, width, layers = img.shape
        size = (width, height)
        print(filename)
        # inserting the frames into an image array
        frame_array.append(img)
    out = cv2.VideoWriter(pathOut, cv2.VideoWriter_fourcc(*'hvc1'), fps, size)
    for i in range(len(frame_array)):
        # writing to a image array
        out.write(frame_array[i])
    out.release()

def check_video_size(path):
    required_height = 560
    required_width = 1118

    vid = cv2.VideoCapture('.'+path)
    height = vid.get(cv2.CAP_PROP_FRAME_HEIGHT)
    width = vid.get(cv2.CAP_PROP_FRAME_WIDTH)

    res = True
    if height!=required_height:
        print("{} is not {}".format(height,required_height))
        res = False

    if width!=required_width:
        print("{} is not {}".format(width,required_width))
        res = False

    return res


def rescale_video(path,filename):
    required_height = 560
    required_width = 1118
    pathOriginal = '.'+path
    pathNew = '.'+MEDIA_URL+'/main/new_'+filename
    cap = cv2.VideoCapture(pathOriginal)
    fourcc = cv2.VideoWriter_fourcc(*'H','2','6','4')
    out = cv2.VideoWriter(pathNew,fourcc, 60, (required_width,required_height))

    while True:
        ret, frame = cap.read()
        if ret == True:
            b = cv2.resize(frame,(required_width,required_height),fx=0,fy=0, interpolation = cv2.INTER_CUBIC)
            out.write(b)
        else:
            break
        
    cap.release()
    out.release()
    cv2.destroyAllWindows()

def remove_specific_file(file_path):
    file_path = '.' + file_path
    if os.path.isfile(file_path) or os.path.islink(file_path):
        os.unlink(file_path)