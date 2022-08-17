![banner](https://user-images.githubusercontent.com/36157933/181859192-3a88bc30-087f-4555-8ff8-b8ad49bde38b.png)

# VarAid
**VarAid** is the a software built using the Django Python framework which provides referees a user-friendly interface to inspect football broadcasts, 
and provide them with the tools for ease of decision making, most notably, the usage of STVSR to make video highlights clearer, and an automated handball detector. 
The core of this repository is our web app, which utilises submodules [vsr](https://github.com/nadimra/project-varaid) and [handball_detection](https://github.com/nadimra/handball_detection).

# Prerequisites
1. For full functionality, run this web app on localhost on the Mozilla Firefox.
2. This project requires the use of a GPU.

# Setup
##### Initial Setup
1. `git clone https://github.com/nadimra/handball-detection.git` 

##### HRNet Setup
2. Go to the `project_HRNet` directory and `pip install -r requirements.txt`.
3. Download the pretrained weights for the HRNet object detector and place it within `/project_HRNet/models/detectors/yolo/weights`. We used [yolov3.weights](https://pjreddie.com/media/files/yolov3.weights).
4. Download the pretrained weights for HRNet and place it within `/project_HRNet/weights`. We used [pose_hrnet_w48_384x288.pth](https://drive.google.com/open?id=1UoJhTtjHNByZSm96W3yFTfU5upJnsKiS).

##### yolo5 Setup
5. Go to the `project_yolo5` directory and `pip install -r requirements.txt`.
6. Download the pretrained weights for yolov5 and place it within `/project_yolo5/weights`. We use [yolo5s.pt](https://github.com/ultralytics/yolov5/releases/download/v6.1/yolov5s.pt).

# How to use
Run the following command: (make sure to change the ``vid_path`` variable to pass a video).
```
python main.py
```
Outputs are saved in ``/project_HRNet/outputs``. If a handball occured, an additional image ``decision.png`` will show the frame of when the handball occured. 

# Acknowledgements
Our code is built on [HRNet](https://github.com/stefanopini/simple-HRNet) and [YOLOv5](https://github.com/ultralytics/yolov5). We thank the authors for sharing their codes.
