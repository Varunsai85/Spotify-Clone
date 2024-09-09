console.log("Hello");
let currentSong=new Audio();
const playMusic=track=>{
    currentSong.src="/Music/"+track+".mp3"
    currentSong.play()
}
async function gettingsongs(){
    let a=await fetch("http://127.0.0.1:3000/Music/");
    let response=await a.text();
    let div = document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/Music/")[1])
        }
    }
    return songs;
}
async function main(){
    let songs=await gettingsongs()
    console.log(songs);
    songpicturesArray=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzv_wHOednxprllI1TjPHsVIaw_1YPZxgaA&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzv_wHOednxprllI1TjPHsVIaw_1YPZxgaA&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ6w_-dFgThfUNM-KcAdzThye3j76g-nC5Q&s","https://i.scdn.co/image/ab67616d0000485161551990618657e191d7665d","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcLn4aQYAUTPF6XwO3c3PSauFVEx2t92XaA&s","https://i.scdn.co/image/ab67616d0000b2735a30aac46fbabf9fec0bc9ba","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS63MO-I4W83zapl8-ssI6c8TP4dvSyt7lmA&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRquM2AY_lLEEX8TP3qmkEiU9OlQuF5FbYzBw&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ6w_-dFgThfUNM-KcAdzThye3j76g-nC5Q&s"]
    let songinsertion=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (let index = 0; index < songpicturesArray.length; index++) {
        const picture = songpicturesArray[index];
        const name=songs[index].replaceAll("%20"," ").replaceAll(".mp3","")
        songinsertion.innerHTML=songinsertion.innerHTML+`<li class="songlistitems cursorpointer">
                        <div class="songlistpicture posrelative">
                            <div class="songlistpicture-playbtn posabs flex-box aligncenter">
                                <img class="svgdec invert samplesongplay-btn" src="Assets/Images/play.svg" alt="playbutton">
                            </div>
                            <img src="${picture}" alt="gabbarsingh" class="songlistpictire-picture posabs">
                        </div>
                        <div class="columnflex samplesonginfo textoverflow-ellipsis2">
                            <h4 class="samplesongname whitefontlighter textoverflow-ellipsis">${name}</h4>
                            <h5 class="samplesongartist grayfontlighter textoverflow-ellipsis">Varun</h5>
                        </div>
                    </li>`;
    }
    let play=document.querySelector(".controlplaybutton");
    Array.from(document.querySelector(".samplesongslist").getElementsByTagName("li")).forEach(e=>{
        e.querySelector(".songlistpicture").addEventListener("click",()=>{
            playMusic(e.querySelector(".samplesongname").innerHTML);
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
}
main()