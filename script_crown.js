let video;
let latestPrediction = null;
let modelIsLoading  = true;
let crownImage;

const FOREHEAD_POINT = 151;
const LEFT_FOREHEAD = 104;
const RIGHT_FOREHEAD = 333


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

    imageMode(CORNER)
    image(video, 0, 0, width, height);
    if(latestPrediction === null){
        return;
    }
    let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT]
    let leftForeheadLocation = latestPrediction.scaledMesh[LEFT_FOREHEAD];
    let rightForeheadLocation = latestPrediction.scaledMesh[RIGHT_FOREHEAD];

    

    let foreheadWidth = dist(leftForeheadLocation[0],leftForeheadLocation[1],rightForeheadLocation[0],rightForeheadLocation[1]);

    console.log(foreheadWidth)

    let crownWidth = foreheadWidth * 3;
    let crownHeight = (crownImage.height / crownImage.width) * crownWidth

    imageMode(CENTER)
    image(crownImage, foreheadLocation[0],foreheadLocation[1] - (crownHeight / 2), crownWidth,crownHeight);
    
}