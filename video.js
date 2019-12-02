/* get functional elements */
const player = document.querySelector('.player');

const video = document.querySelector('.viewer');

const progress = document.querySelector('.progress');

const progressBar = document.querySelector('.progress__filled');

const toggle = document.querySelector('.toggle');

const skipButtons = document.querySelectorAll('[data-skip]');

const ranges = document.querySelectorAll ('.player__slider');

let mousedown = false;

const fullScreen = document.querySelector('.full_screen');


/* build functions */
function togglePlay() {

    // if(video.paused){
    //     video.play();
    // }
    // else{
    //     video.pause();
    // }
    //another way to code for the above code piece

    const method = video.paused ? 'play' : 'pause';

    video[method]();

}



function decodeHTML(str) {

    var txt = document.createElement('textarea');

    txt.innerHTML = str;
    
	return txt.value;

}


function updateButton() {

    let playIcon = decodeHTML('&#9658;');

    let pauseIcon = decodeHTML('&#9614;' + '&#9614;'); 

    const icon = this.paused ? playIcon : pauseIcon

    toggle.textContent = icon;

}


function skipVideo() {

    video.currentTime += parseFloat(this.dataset.skip);

}


function handleRangeUpdate() {

    video[this.name] = this.value;

}


function handleProgressBar() {

    const percent = (video.currentTime / video.duration) * 100;

    progressBar.style.flexBasis = `${percent}%`;

}


function scrub(e) {

    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;

}


function handleScreenSize() {

    video.requestFullscreen();

}


/* event listners */

video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);

video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skipVideo));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgressBar);

progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => mousedown = true);

progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', handleScreenSize);

