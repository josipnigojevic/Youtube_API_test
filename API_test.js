//secret key i link od API
const display=document.querySelector('.rectangle-1');
let api_key ='AIzaSyDvG-wVyKLJgWdJ1LaWtoqfJafWWE7p10s';//Nemoš koristit ovaj,tribaš nabavit svoj
let video_http="https://www.googleapis.com/youtube/v3/videos?";
let kanal_http="https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part:'snippet',
    chart: 'mostPopular',
    //
    maxResults:7,
    //za specificirat odakle dobavljamo podatke
    regionCode:'IN',
}))
.then(res=> res.json())
.then(data=>{
    //console.log(data);
    data.items.forEach(item=>{
        getChannelIcon(item);
    })
}).catch(err=>console.log(err));
//odvojena funkcija za dobavljanje thumbnailova
const getChannelIcon=(video_data)=>{
fetch(kanal_http+new URLSearchParams({
    key:api_key,
    part:'snippet',
    id:video_data.snippet.channelId,

}))
.then(res=>res.json())
.then(data=>{
    video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);
})
}
//funkcija za dodavat video elemente na str
const makeVideoCard=(data)=>{
display.innerHTML +=`

<div class="video" onClick="location.href='https://youtube.com/watch?v=${data.id}'">
<img src="${data.snippet.thumbnails.high.url}"class="thumbnail"alt="">
<div class="content">
<img src="${data.channelThumbnail}"class="channel-icon"alt="">
<div class="info">
<h4 class="titles">${data.snippet.title}</h4>
<p class="channel-name">${data.snippet.channelTitle}</p>
</div>
</div>
</div>
</di>
`;
}

const searchInput=document.querySelector('.search_bar');
const searchBotun=document.querySelector('.search_btn');
let search_link="https://www.youtube.com/results?search_query=";

searchBotun.addEventListener('click',()=>{
    if(searchInput.value.length){
        location.href=search_link+searchInput.value;
    }
})
