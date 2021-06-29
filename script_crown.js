let video;
let latestPrediction = null;
let modelIsLoading  = true;
let crownImage;

const FOREHEAD_POINT = 151;


function preload() {
    crownImage = loadImage("assets/crown.png");
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    let facemesh = ml5.facemesh(video,() => {
        console.log("Model is ready");
        modelIsLoading = false;
    });

    facemesh.on("predict", (results) => {
        //console.log(results[0]);
        latestPrediction = results[0]
        
    })

    video.hide();
}

function draw(){

    
    image(video, 0, 0, width, height);
    if(latestPrediction === null){
        return;
    }
    let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT]
    console.log(foreheadLocation)
    image(crownImage, foreheadLocation[0] - 50,foreheadLocation[1] - 50, 100,100);
}