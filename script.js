let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon=document.getElementById("ctrlIcon");
let cover =document.getElementById("cover");
let title =document.getElementById("title");
let artist =document.getElementById("artist");
let prevBtn =document.getElementById("prev");
let nextBtn =document.getElementById("next");

const API_KEY=process.env.API_SECRET_KEY;
const API_URL=  `https://api.jamendo.com/v3.0/tracks/?client_id=${API_KEY}`+
  `&format=json&limit=20&include=musicinfo&audioformat=mp31`;;

let playList =[];
let index = 0;

async function getSongs(url){
let response = await fetch(url);
let data = await response.json();
playList=data.results;
console.log(playList);
loadTrack(0);
}
getSongs(API_URL);

function loadTrack(i){
    let storeSong = playList[i];
    if(!storeSong) return;

     song.src=storeSong.audio;
     cover.src = storeSong.album_image;
     title.textContent = storeSong.name; 
     artist.textContent = storeSong.artist_name;

     progress.value=0;
     song.play();// auto play 

     ctrlIcon.classList.add("fa-pause");
     ctrlIcon.classList.remove("fa-play");

}


nextBtn.addEventListener("click",()=>{
     if(!playList.length) return;
     index =(index + 1) % playList.length;
     loadTrack(index);
})

prevBtn.addEventListener("click",()=>{
     if(!playList.length) return;
    index = (index - 1 + playList.length) % playList.length;
     loadTrack(index);
})

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value=0;
   
}

song.addEventListener('ended',()=>{
    nextBtn.click();
})

song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
});

// Toggle play/pause
function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

// Seek in the song when slider is changed
 progress.onchange = function() {
    song.currentTime = progress.value;
    song.play(); // Optional: remove this line if you don't want it to auto-play on seek
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
};