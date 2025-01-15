const video = document.getElementById('video');
const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const muteButton = document.getElementById('muteButton');
const muteIcon = document.getElementById('muteIcon');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');

// Set the initial state of audio/video as paused and muted
audio.pause();
video.pause();
audio.unmuted = true;
video.muted = true;

// Play/Pause Logic
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        video.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        video.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
});

// Mute/Unmute Logic
muteButton.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        video.muted = false;
        muteIcon.classList.replace('fa-volume-xmark', 'fa-volume-high');
    } else {
        audio.muted = true;
        video.muted = true;
        muteIcon.classList.replace('fa-volume-high', 'fa-volume-xmark');
    }
});

// Update progress bar as audio plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
});

// Seek to different position when clicking on progress bar
progressContainer.addEventListener('click', (e) => {
    const clickPosition = e.offsetX;
    const totalWidth = progressContainer.offsetWidth;
    const seekTime = (clickPosition / totalWidth) * audio.duration;
    audio.currentTime = seekTime;
    video.currentTime = seekTime; // Sync video with audio
});