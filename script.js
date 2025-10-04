console.log("Hello");
let currentSong=new Audio();
const playMusic=(track,pause=false)=>{
    currentSong.src=track;
    if(!pause){
        currentSong.play().catch(err=>console.log("Playback error : ",err));
    }
}
function formatTime(seconds) {
    if(isNaN(seconds)|| seconds<0){
        return "0"+':'+"00";
    }else{
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    // If seconds are less than 10, pad with a leading zero
    const paddedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    
    return minutes + ':' + paddedSeconds;
    }
}
  
async function gettingsongs(){
    let a=await fetch("songs.json");
    let songs=await a.json();
    return songs;
}
async function main(){
    let songs=await gettingsongs();
    let songname=songs[0].split("/").pop().replace(".mp3","").replaceAll("%20"," ");
    let songpicturesArray=await fetch("songPictures.json");
    songpicturesArray=await songpicturesArray.json();
    let songinsertion=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (let index = 0; index < songpicturesArray.length; index++) {
        const picture = songpicturesArray[index];
        const name=songs[index].split("/").pop().replace(".mp3","").replaceAll("%20"," ");
        songinsertion.innerHTML=songinsertion.innerHTML+`<li class="songlistitems cursorpointer">
                        <div class="songlistpicture posrelative">
                            <div class="songlistpicture-playbtn posabs flex-box aligncenter">
                                <img class="svgdec invert samplesongplay-btn" src="Assets/Images/play.svg" alt="playbutton">
                            </div>
                            <img src="${picture}" alt="samplemusicpicture" class="songlistpictire-picture posabs">
                        </div>
                        <div class="columnflex samplesonginfo textoverflow-ellipsis2">
                            <h4 class="samplesongname whitefontlighter textoverflow-ellipsis">${name}</h4>
                            <h5 class="samplesongartist grayfontlighter textoverflow-ellipsis">Varun</h5>
                        </div>
                    </li>`;
    }
    let play=document.querySelector(".controlplaybutton");

    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".starttime").innerHTML=formatTime(currentSong.currentTime);
        document.querySelector(".endtime").innerHTML=formatTime(currentSong.duration);
        document.querySelector(".seekbarinside").style.width=(currentSong.currentTime/currentSong.duration)*100+"%"
    })
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        console.log(e.offsetX, e.target.getBoundingClientRect().width);
        console.log((e.offsetX/e.target.getBoundingClientRect().width)*100+"%");
        document.querySelector(".seekbarinside").style.width=(percent)+"%";
        currentSong.currentTime=((currentSong.duration)*percent)/100;
    })
    Array.from(document.querySelector(".samplesongslist").getElementsByTagName("li")).forEach((e,idx)=>{
        e.querySelector(".songlistpicture").addEventListener("click",()=>{
            playMusic(songs[idx]);
            document.querySelector(".playpicture").src=e.querySelector(".songlistpictire-picture").src
            document.querySelector(".songname").innerHTML=e.querySelector(".samplesongname").innerHTML
            document.querySelector(".artist").innerHTML=e.querySelector(".samplesongartist").innerHTML
            play.querySelector(".svgdecplaybtn").src="Assets/Images/pause.svg"
        })
    })
    
    play.addEventListener("click",()=>{
        if (currentSong.paused){
            currentSong.play();
            play.querySelector(".svgdecplaybtn").src="Assets/Images/pause.svg"
        }
        else{
            currentSong.pause();
            play.querySelector(".svgdecplaybtn").src="Assets/Images/play.svg"
        }
    })

    const firstsong=(songname)=>{
        playMusic(songname,true);
        let e=document.querySelector(".samplesongslist").getElementsByTagName("li")[0];
        document.querySelector(".playpicture").src=songpicturesArray[0]
        document.querySelector(".songname").innerHTML=songname
    }
    firstsong(songname)
    
}
main()