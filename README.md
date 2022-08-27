![banner](https://user-images.githubusercontent.com/36157933/181859192-3a88bc30-087f-4555-8ff8-b8ad49bde38b.png)

# VarAid
**VarAid** is the a software built using the Django Python framework which provides referees a user-friendly interface to inspect football broadcasts, 
and provide them with the tools for ease of decision making, most notably, the usage of STVSR to make video highlights clearer, and an automated handball detector. 
The core of this repository is our web app, which utilises submodules [vsr](https://github.com/nadimra/project-varaid) and [handball_detection](https://github.com/nadimra/handball_detection).

# Prerequisites
1. For full functionality, run this web app on localhost on the Mozilla Firefox browser.
2. This project requires the use of a GPU.

# Setup
1. `git clone https://github.com/nadimra/project-varaid` 
2. `git pull --recurse-submodules` 
3. Follow the instructions to setup [handball_detection](https://github.com/nadimra/handball_detection), installing the dependencies and dowloading relevant models.
4. Follow the instructions to setup [vsr](https://github.com/nadimra/vsr), installing the dependencies and dowloading relevant models.
5. Now install the web app requirements `pip install -r requirements.txt`
6. Add the following empty directories in the root directory (these directories are placeholders for uploaded video content):

```
📂 project-varaid
 ┣ 📂 media
    ┣ 📂 main
    ┣ 📂 highlights
    ┣ 📂 decisions
```

7. If the current hosted machine uses a GPU, then you can simply run `python manage.py runserver` which will host the web app on your localhost. You can alternatively run the web app remotely on a GPU. To do this, navigate to the `settings.py` file in the `VarAid` app directory. Add the GPU machine IP address to the `ALLOWED_HOSTS` variable. Next, run `python manage.py runserver [GPU IP ADDRESS]:8000`.
8. Open your web browser with the specified link to reach the web app.

# How do you use VarAid?
To start, click the **Upload** button to upload a football broadcast. Once uploaded, the video will be shown in the **Main Broadcast** page, which will display a custom built video player with several controls, as shown in Fig.1. Fig.2 displays the workflow of extracting a highlight from the main broadcast. When the user extracts a highlight, a 3 second clip from the current video position is extracted and input into our **Space-Time Video Super Resolution** model to improve the video quality of the clip. 

![video-player-controls](https://user-images.githubusercontent.com/36157933/185813324-76d05a5e-c4d2-4edf-981e-6d5f2fdc5ccd.png)
*Fig.1: (1) play, (2) skip, (3) autoplay, (4) extract highlights, (5) crop, (6) playback, (7) fullscreen*

![varaid_gif](https://user-images.githubusercontent.com/36157933/185813357-3acb3fe9-0c9b-4926-bb33-028e5acee48d.gif)

*Fig.2: Example GIF showing a user pausing a main broadcast, adjusting the crop settings, and then extracting the highlight.*

For **extracted highlights**, referees have the chance to explore this footage in high resolution, using our custom video controls to aid the process. Referees can also use our **handball detector** tool to automatically detect handballs for highlights. To do this, click the **handball** control on the video player, and wait for some time for a decision to be processed (~ 1 minute). Our handball detector will output a decision. If a handball is given, then an image of the offence is extracted, with the pose estimation and object detector information being shown in the image, along with the angle of the arm that the ball collided with (Note. If a previous offence is outputted, make sure to clear your cache and try again). An example of the handball tool in action is displayed in Fig.3. 

![varaid-handball](https://user-images.githubusercontent.com/36157933/185813419-c507c0ed-e6e7-4720-b9b8-c71949db69e5.PNG)
*Fig.3: Output from handball detector.*

Finally, users can clear their storage using the **Clear** button in the navigation menu, which will automatically remove the highlights and main broadcast from your local drive.

# Snapshots

# Code Ownership
In this section, we highlight the code that we ammended in this thesis based on other peoples work. If the code is based on a network, then it can be implied that the files from the original open source repository were not changed unless mentioned in the following list. If any directories/files are not included in this list which are not part of an open source network, then it can be implied that it is code that I own individually.

- The video player design in the VarAid web app is based off [this](https://stechwebapp.blogspot.com/2021/10/how-to-create-custom-video-player-using-javascript.html) link. Additional functionality was added to this player, including the ability to use the cropButton, crop draggable item, adjust crop sizes, and the ability to extract highlights. The main adjustments in the design and functionality can be found in `templates/player/main.html` and `static_in_env/js/video.js`.
- The design of the web app is based off [this](https://colorlib.com/wp/template/bootstrap-sidebar-03/) template. We utilize this template as a base design, and adjust it to suit our content.
- Inside submodule vsr, most content is utilized from the [Zooming Slow-Mo network](https://github.com/Mukosame/Zooming-Slow-Mo-CVPR-2020). Inside `vsr/codes`, we create several test files for our own dataset labelled `test_[].py`. We create several data loaders for our dataset in `data/FootballVids_dataset.py` and `data/PlayerVids_dataset.py`. Inside `models/VideoSR_base_model.py`, we update the base model for the Zooming Slow-Mo network, which feeds in segmentation information for training. Inside `models/modules/Sakuya_arch.py`, we make adjustments to the network architecture suited for our dataset.
- Inside the submodule handball_detection, we utilize networks [HRNet](https://github.com/stefanopini/simple-HRNet) and [YOLOv5](https://github.com/ultralytics/yolov5):
  - Inside the `project_yolo5` directory, we ammend the file `detect_simple.py` to keep track of ball objects and deflections, and `utils/plots.py` to draw a ball trajectory and use kalman filters to filter the deflected frames. 
  - Inside the `project_HRNet` directory, we ammend the file `scripts/live_demo.py` so that it takes in additional parameters for information about the deflected frames, and we adjust the code so that it loops through each detected person and applies the handball collider algorithm, which can be found in `misc/handball_collider.py`.
  
# Acknowledgements
Our code utilizes [Zooming Slow-Mo network](https://github.com/Mukosame/Zooming-Slow-Mo-CVPR-2020), [HRNet](https://github.com/stefanopini/simple-HRNet), [YOLOv5](https://github.com/ultralytics/yolov5). We thank the authors for sharing their codes.
