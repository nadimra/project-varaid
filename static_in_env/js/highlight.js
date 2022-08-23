const video_player = document.querySelector("#video_player"),
  mainVideo = video_player.querySelector("#main-video"),
  progressAreaTime = video_player.querySelector(".progressAreaTime"),
  controls = video_player.querySelector(".controls"),
  progressArea = video_player.querySelector(".progress-area"),
  progress_Bar = video_player.querySelector(".progress-bar"),
  play_pause = video_player.querySelector(".play_pause"),

  current = video_player.querySelector(".current"),
  totalDuration = video_player.querySelector(".duration"),
  auto_play = video_player.querySelector(".auto-play"),
  settingsBtn = video_player.querySelector(".settingsBtn"),

  fullscreen = video_player.querySelector(".fullscreen"),
  settings = video_player.querySelector("#settings"),
  playback = video_player.querySelectorAll(".playback li"),

  tracks = video_player.querySelectorAll("track"),
  loader = video_player.querySelector(".loader");

  handballBtn = video_player.querySelector(".handballBtn"),
  handballDecisionMsg = document.querySelector("#handballDisplay"),
  handballYes = document.querySelector("#yes-handball"),
  handballNo = document.querySelector("#no-handball"),
  handballMsg = document.querySelector("#msg-handball"),
  handballImg = document.querySelector("#decision-output"),

handballDecisionMsg.style.display="None"
handballYes.style.display="None"
handballNo.style.display="None"

// handball button
handballBtn.addEventListener("click", () => {
  if (!handballBtn.classList.contains("active")) {
    handballBtn.classList.toggle("active");
  }
});

handballBtn.addEventListener('click',() => {
    $.ajax(
      {
          type:"GET",
          url: "getHandball",
          data:{
            highlightUrl: window.location.href
          },
          success: function( data ) 
          {
            handballBtn.classList.toggle("active");
            decision = data['handball_decision']
            msg = data['msg']
            handballDecisionMsg.style.display="Block";
            if (decision == true){
              handballYes.style.display="Block";
              handballMsg.innerHTML=msg;
              handballImg.src = "";
              //handballImg.src = "{% media_url %}decisions/decision.png";
            }else{
              handballNo.style.display="Block";

            }

            //window.location.assign('/player/highlight_'+data)
          }
        })
  });


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



