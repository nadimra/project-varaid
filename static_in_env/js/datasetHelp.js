const video_player = document.querySelector("#video_player"),
  mainVideo = video_player.querySelector("#main-video"),
  progressAreaTime = video_player.querySelector(".progressAreaTime"),
  controls = video_player.querySelector(".controls"),
  progressArea = video_player.querySelector(".progress-area"),
  progress_Bar = video_player.querySelector(".progress-bar"),
  fast_rewind = video_player.querySelector(".fast-rewind"),
  play_pause = video_player.querySelector(".play_pause"),
  fast_forward = video_player.querySelector(".fast-forward"),
  // volume = video_player.querySelector(".volume"),
  // volume_range = video_player.querySelector(".volume_range"),
  current = video_player.querySelector(".current"),
  totalDuration = video_player.querySelector(".duration"),
  auto_play = video_player.querySelector(".auto-play"),
  settingsBtn = video_player.querySelector(".settingsBtn"),
  //captionsBtn = video_player.querySelector(".captionsBtn"),
  editBtn = video_player.querySelector(".editBtn"),
  cropBtn = video_player.querySelector(".cropBtn"),
  cropBorder = video_player.querySelector("#crop-video"),

  //picture_in_picutre = video_player.querySelector(".picture_in_picutre"),
  fullscreen = video_player.querySelector(".fullscreen"),
  settings = video_player.querySelector("#settings"),
  playback = video_player.querySelectorAll(".playback li"),
  crops = video_player.querySelector("#crops"),
  sizes = video_player.querySelectorAll(".sizes li"),
  tracks = video_player.querySelectorAll("track"),
  loader = video_player.querySelector(".loader");


// Play video function
function playVideo() {
    play_pause.innerHTML = "pause";
    play_pause.title = "pause";
    video_player.classList.add("paused");
    mainVideo.play();
  }
// Pause video function
function pauseVideo() {
    play_pause.innerHTML = "play_arrow";
    play_pause.title = "play";
    video_player.classList.remove("paused");
    mainVideo.pause();
}

play_pause.addEventListener("click", () => {
  const isVideoPaused = video_player.classList.contains("paused");
  isVideoPaused ? pauseVideo() : playVideo();
});

mainVideo.addEventListener("play", () => {
  playVideo();
});

mainVideo.addEventListener("pause", () => {
  pauseVideo();
});

  
  // fast_rewind video function
fast_rewind.addEventListener("click", () => {
    mainVideo.currentTime -= 10;
});

  // fast_forward video function
fast_forward.addEventListener("click", () => {
  mainVideo.currentTime += 10;
});

// Load video duration
mainVideo.addEventListener("loadeddata", (e) => {
  let videoDuration = e.target.duration;
  let totalMin = Math.floor(videoDuration / 60);
  let totalSec = Math.floor(videoDuration % 60);

  // if seconds are less then 10 then add 0 at the begning
  totalSec < 10 ? (totalSec = "0" + totalSec) : totalSec;
  totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
});

// Current video duration
mainVideo.addEventListener("timeupdate", (e) => {
  let currentVideoTime = e.target.currentTime;
  let currentMin = Math.floor(currentVideoTime / 60);
  let currentSec = Math.floor(currentVideoTime % 60);
  // if seconds are less then 10 then add 0 at the begning
  currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  current.innerHTML = `${currentMin} : ${currentSec}`;

  let videoDuration = e.target.duration;
  // progressBar width change
  let progressWidth = (currentVideoTime / videoDuration) * 100 + 0.5;
  progress_Bar.style.width = `${progressWidth}%`;
});


// let's update playing video current time on according to the progress bar width

progressArea.addEventListener("click", (e) => {
  let videoDuration = mainVideo.duration;
   let progressWidthval = progressArea.clientWidth + 2;
   let ClickOffsetX = e.offsetX;
   mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
   
   let progressWidth = (mainVideo.currentTime / videoDuration) * 100 + 0.5;
   progress_Bar.style.width = `${progressWidth}%`;
   
   let currentVideoTime = mainVideo.currentTime;
   let currentMin = Math.floor(currentVideoTime / 60);
   let currentSec = Math.floor(currentVideoTime % 60);
   // if seconds are less then 10 then add 0 at the begning
   currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
   current.innerHTML = `${currentMin} : ${currentSec}`;
 });


 // change volume
// function changeVolume() {
//   mainVideo.volume = volume_range.value / 100;
//   if (volume_range.value == 0) {
//     volume.innerHTML = "volume_off";
//   } else if (volume_range.value < 40) {
//     volume.innerHTML = "volume_down";
//   } else {
//     volume.innerHTML = "volume_up";
//   }
// }

// function muteVolume() {
//   if (volume_range.value == 0) {
//     volume_range.value = 80;
//     mainVideo.volume = 0.8;
//     volume.innerHTML = "volume_up";
//   } else {
//     volume_range.value = 0;
//     mainVideo.volume = 0;
//     volume.innerHTML = "volume_off";
//   }
// }

// volume_range.addEventListener("change", () => {
//   changeVolume();
// });

// volume.addEventListener("click", () => {
//   muteVolume();
// });


// Update progress area time and display block on mouse move
progressArea.addEventListener("mousemove", (e) => {
  let progressWidthval = progressArea.clientWidth + 2;
  let x = e.offsetX;
  let videoDuration = mainVideo.duration;
  let progressTime = Math.floor((x / progressWidthval) * videoDuration);
  let currentMin = Math.floor(progressTime / 60);
  let currentSec = Math.floor(progressTime % 60);
  progressAreaTime.style.setProperty("--x", `${x}px`);
  progressAreaTime.style.display = "block";
  if (x >= progressWidthval - 80) {
    x = progressWidthval - 80;
  } else if (x <= 75) {
    x = 75;
  } else {
    x = e.offsetX;
  }

  // if seconds are less then 10 then add 0 at the begning
  currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;


});

progressArea.addEventListener("mouseleave", () => {
  //thumbnail.style.display = "none";
  progressAreaTime.style.display = "none";
});


// Auto play
auto_play.addEventListener("click", () => {
  auto_play.classList.toggle("active");
  if (auto_play.classList.contains("active")) {
    auto_play.title = "Autoplay is on";
  } else {
    auto_play.title = "Autoplay is off";
  }
});

mainVideo.addEventListener("ended", () => {
  if (auto_play.classList.contains("active")) {
    playVideo();
  } else {
    play_pause.innerHTML = "replay";
    play_pause.title = "Replay";
  }
});

// Picture in picture

// picture_in_picutre.addEventListener("click", () => {
//   mainVideo.requestPictureInPicture();
// });

// Full screen function

fullscreen.addEventListener("click", () => {
  if (!video_player.classList.contains("openFullScreen")) {
    video_player.classList.add("openFullScreen");
    fullscreen.innerHTML = "fullscreen_exit";
    video_player.requestFullscreen();
  } else {
    video_player.classList.remove("openFullScreen");
    fullscreen.innerHTML = "fullscreen";
    document.exitFullscreen();
  }
});


// edit button
editBtn.addEventListener("click", () => {
  if (!editBtn.classList.contains("active")) {
    editBtn.classList.toggle("active");
  }
});

// Open settings
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("active");
  settingsBtn.classList.toggle("active");
});

playback.forEach((event) => {
  event.addEventListener("click", () => {
    removeActiveClasses(playback);
    event.classList.add("active");
    let speed = event.getAttribute("data-speed");
    mainVideo.playbackRate = speed;
  });
});

// Open crop
cropBtn.addEventListener("click", () => {
  crops.classList.toggle("active");
  cropBtn.classList.toggle("active");
});

sizes.forEach((event) => {
  event.addEventListener("click", () => {
    removeActiveClasses(sizes);
    event.classList.add("active");
    let size = event.getAttribute("data-size");
    cropBorder.style.height = size + '%';
    cropBorder.style.width = size + '%';
    cropBorder.style.top = '0';
    cropBorder.style.left = '0';

  });
});


function removeActiveClasses(e) {
  e.forEach((event) => {
    event.classList.remove("active");
  });
}

mainVideo.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});


// Mouse move controls
video_player.addEventListener("mouseenter", () => {
  controls.classList.add("active");
});

video_player.addEventListener("mouseleave", () => {
  if (video_player.classList.contains("paused")) {
    if (
      settingsBtn.classList.contains("active")) {
      controls.classList.add("active");
    } else {
      controls.classList.remove("active");
    }
  } else {
    controls.classList.add("active");
  }
});

if (video_player.classList.contains("paused")) {
  if (
    settingsBtn.classList.contains("active")
  ) {
    controls.classList.add("active");
  } else {
    controls.classList.remove("active");
  }
} else {
  controls.classList.add("active");
}



// Dragging crop border

dragElement(document.getElementById("crop-video"));

function dragElement(elmnt) {

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  if (document.getElementById("drag-element")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("drag-element").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    checkBounds();
    
  }

  function checkBounds(){
  
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


editBtn.addEventListener('click',() => {
  // var catid;
  // catid = $(this).attr("data-catid");
  var cropBounds = getCropBounds();

  if(checkBounds() == false){
    $('#cropModal').modal('show');
    editBtn.classList.toggle("active");
  }else{
    $.ajax(
      {
          type:"GET",
          url: "extractFrames",
          data:{
            currentTime: mainVideo.currentTime,
            cropTop: cropBounds[0],
            cropBottom: cropBounds[1],
            cropLeft: cropBounds[2],
            cropRight: cropBounds[3],
          },
          success: function( data ) 
          {
            editBtn.classList.toggle("active");
          }
      })
  }

  

  
});


function checkBounds(){
  e = document.getElementById("crop-video")
  v = document.getElementById("video_player")

  const crop_rect = e.getBoundingClientRect();
  const vid_rect = v.getBoundingClientRect();

  var heightOffset = vid_rect.top.toFixed()
  var widthOffset = vid_rect.left.toFixed()
  var cropTop = crop_rect.top.toFixed() - heightOffset
  var vidTop = vid_rect.top.toFixed() - heightOffset
  var cropLeft = crop_rect.left.toFixed() - widthOffset
  var vidLeft = vid_rect.left.toFixed() - widthOffset

  var cropBottom = cropTop + crop_rect.height
  var vidBottom = vidTop + vid_rect.height
  var cropRight = cropLeft + crop_rect.width
  var vidRight = vidLeft + vid_rect.width

  console.log("\n")
  console.log(cropTop,cropLeft,vidTop,vidLeft)
  console.log(cropBottom,cropRight,vidBottom,vidRight)

  if(cropTop < vidTop){
    return false;
  }
  if(cropLeft < vidLeft){
    return false;
  }
  if(cropBottom > vidBottom){
    return false;
  }
  if(cropRight > vidRight){
    return false;
  }
  return true;
}

function getCropBounds(){
  e = document.getElementById("crop-video")
  v = document.getElementById("video_player")

  const crop_rect = e.getBoundingClientRect();
  const vid_rect = v.getBoundingClientRect();

  var heightOffset = vid_rect.top.toFixed()
  var widthOffset = vid_rect.left.toFixed()
  var cropTop = crop_rect.top.toFixed() - heightOffset
  var vidTop = vid_rect.top.toFixed() - heightOffset
  var cropLeft = crop_rect.left.toFixed() - widthOffset
  var vidLeft = vid_rect.left.toFixed() - widthOffset

  var cropBottom = cropTop + crop_rect.height
  var vidBottom = vidTop + vid_rect.height
  var cropRight = cropLeft + crop_rect.width
  var vidRight = vidLeft + vid_rect.width

  return [cropTop,cropBottom,cropLeft,cropRight]
}