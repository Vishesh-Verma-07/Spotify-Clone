console.log("welcome to spotify");


//inittialize the variable 
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Chaleya - Jawan", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Zinda Banda - Jawan", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Humsafar - Badrinath Ki Dulhania", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Phir Kabhi - MS Dhoni", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Main Tenu Samjhawan Ki", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Heeriye - Arijit Singh", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Jeena Jeena - Badlapur", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Rabba Mehar Kari - Darshan Raval", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Naacho Naacho - RRR", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Besharam Rang - Pathaan", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

// let songsAlt=[
//     {songName: "Chaleya", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Zinda Banda", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
//     {songName: "Humsafar", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
//     {songName: "Phir Kabhi", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
//     {songName: "Main Tenu Samjhawan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
//     {songName: "Heeriye", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
//     {songName: "Jeena Jeena", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
//     {songName: "Rabba Mehar Kari", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
//     {songName: "Naacho Naacho", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
//     {songName: "Besharam Rang", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
// ]

songItem.forEach((element,i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
// // songItem.forEach((element,i)=> {
   
// //         let temp = element.getElementsByClassName("timeline")[0].innerText=parseInt(audioElement.duration)
// //         console.log(temp)
// //         console.log("chala")
        
 
// // });


// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        console.log()
        let currbutton= document.getElementById(songIndex)
        currbutton.classList.remove('fa-circle-play')
        currbutton.classList.add('fa-circle-pause')
      
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        makeAllPlays();
    }
})
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})


myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
const makeAllPause = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            songIndex = parseInt(e.target.id);
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else{
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            audioElement.pause();
        }

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 10
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.addEventListener('DOMContentLoaded',init);
function init(){
    let query = window.matchMedia("(max-width: 500px)");
    if(query.matches){
        // songItem.forEach((element,i)=> {
        //     // element.getElementsByTagName("img")[0].src = songsAlt[i].coverPath;
        //     element.getElementsByClassName("songName")[0].innerText=songsAlt[i].songName;           
        // });
        songItem.forEach((element)=>{
           element.getElementsByClassName("time")[0].innerHTML=" "
        }
        )
    }
}