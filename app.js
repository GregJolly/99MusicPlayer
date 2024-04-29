let progress = document.getElementById("progress");
let audio = document.querySelector("#song");
let ctrlIcon= document.querySelector("#ctrlIcon");
let songName = document.querySelector(".song-name");
let artistName = document.querySelector(".artist-name");
let coverArt = document.querySelector(".song-img"); 
const forwardBtn = document.querySelector("#forward");
const backBtn = document.querySelector("#back");
let albumName = document.querySelector(".album-name");
let download = document.querySelector("#download");
let downloadLink = document.querySelector("#downloadLink");
let spotifyBtn = document.querySelector("#spotify-btn");
let spotifyLink =  document.querySelector("#spotify-link");
let currentMusic = 0; 


ctrlIcon.addEventListener("click", ()=>
{
    if (ctrlIcon.classList.contains("fa-pause"))
    {
        audio.pause();
        ctrlIcon.classList.remove("fa-pause"); 
        ctrlIcon.classList.add("fa-play");
    }
    else
    {
        audio.play();  
        ctrlIcon.classList.add("fa-pause");             
        ctrlIcon.classList.remove("fa-play");
    }

});
 
const setMusic = (i) => 
{
    progress.value = 0;
    let song = songs[i];
    currentMusic = i;
    audio.src = song.path;

    songName.innerHTML = song.name; 
    artistName.innerHTML = song.artist; 
    
    albumName.innerHTML = song.album;
    
    setTimeout(()=>{

        progress.max = audio.duration; 
       
    }, 300);

}

setMusic(0); 

setInterval(()=>{
    
    progress.value = audio.currentTime;  
}, 500);


progress.addEventListener("click",()=>{
    audio.currentTime = progress.value;
  
});


forwardBtn.addEventListener("click", ()=>
{
    if (currentMusic >= songs.length - 1)
    {
        currentMusic = 0;
    }
    else 
    {
        currentMusic ++; 
    }

    setMusic(currentMusic); 
    audio.play();  
    ctrlIcon.classList.add("fa-pause");             
    ctrlIcon.classList.remove("fa-play");
 
})
backBtn.addEventListener("click", ()=>
{
    if (currentMusic <= 0)
    {
        currentMusic = song.length-1 ;
    }
    else    
    {
        currentMusic--; 
    }

    setMusic(currentMusic); 
    audio.play();  
    ctrlIcon.classList.add("fa-pause");             
    ctrlIcon.classList.remove("fa-play");

})


download.addEventListener('click', () => {
    if (audio.src) {
        const fileName = audio.src.split('/').pop(); // Extract filename from audio URL
        downloadLink.href = audio.src;
        downloadLink.download = fileName;
        downloadLink.click();
    } else {
        console.error('Audio source not found.');
    }
});

spotifyBtn.addEventListener('click', ()=>
{   
    const currentSong = songs[currentMusic];
    spotifyLink.href = currentSong.spotifyLnk;
});