// script.ts

interface Video {
    title: string;
    src: string;
}

const videos: Video[] = [
    { title: "Vidéo 1", src: "video1.mp4" },
    { title: "Vidéo 2", src: "video2.mp4" },
    { title: "Vidéo 3", src: "video3.mp4" },
];

const videoList = document.getElementById('videos') as HTMLUListElement;
const videoSource = document.getElementById('video-source') as HTMLSourceElement;
const videoPlayer = document.getElementById('player') as HTMLVideoElement;

videos.forEach(video => {
    const listItem = document.createElement('li');
    listItem.textContent = video.title;
    listItem.onclick = () => {
        videoSource.src = video.src;
        videoPlayer.load();
        videoPlayer.play();
    };
    videoList.appendChild(listItem);
});