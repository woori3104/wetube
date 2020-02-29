const recorderContainer = document.getElementById("jsRecordContainer");
const recorderBtn = document.getElementById("JsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");


let streamObject;
let videoRecorder;


const registerView = () => { 
    const videoID = window.location.heref.split("/videos/")[1];

    fetch(`api/${videoID}/view`, { method: "POST" });
}

const handleVideoData = event => {
    console.log(event);
    const { data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
};

const stopRecording = () => {
    videoRecorder.stop();
    recorderBtn.removeEventListener("click", stopRecording);
    recorderBtn.addEventListener("click", getVideo);
    recorderBtn.innerHTML = "Start recording";
};

const startRecording = () => { 
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recorderBtn.addEventListener("click", stopRecording);
}

const getVideo = async () => { 
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        videoPreview.srcObject = stream;
        videoPreview.play();
        videoPreview.muted = true;
        recorderBtn.innerHTML = "Stop Recoding";
        streamObject = stream;
        startRecording();
    } catch (error) {
        console.log(error);
        recorderBtn.innerHTML = "Cant Record";
    } finally { 
        recorderBtn.removeEventListener("click", getVideo);
    }
    
}

function init() { 
    recorderBtn.addEventListener("click", getVideo);
}

if (recorderContainer) { 
    init();
}