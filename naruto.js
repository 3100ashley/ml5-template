let video;
let latestPrediction = null;
let modelIsLoading  = true;
let narutoImage;

const FOREHEAD_POINT = 151;
const LEFT_FOREHEAD = 104;
const RIGHT_FOREHEAD = 333


function preload() {
    narutoImage = loadImage("assets/naruto_headband.png");
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

function draw() {
    // if (modelIsLoading)
    // show a loading screen
    // draw webcam video
    imageMode(CORNER);
    image(video, 0, 0, width, height);
    //-----------------------------------
    if (latestPrediction == null) return; // don't draw anything else
    // get forhead locations
    let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT];
    let leftForeheadLocation = latestPrediction.scaledMesh[LEFT_FOREHEAD];
    let rightForeheadLocation = latestPrediction.scaledMesh[RIGHT_FOREHEAD];
    let foreheadWidth = dist(
      leftForeheadLocation[0 /* x */],
      leftForeheadLocation[1 /* y */],
      rightForeheadLocation[0 /* x */],
      rightForeheadLocation[1 /* y */]
    );
    
    let narutoWidth = foreheadWidth * 3;
    let narutoHeight = (narutoImage.height / narutoImage.width) * narutoWidth;
    imageMode(CENTER);
    image(
      narutoImage,
      foreheadLocation[0 /* x */],
      foreheadLocation[1 /* y */] - narutoHeight / 8,
      narutoWidth /* width */,
      narutoHeight /* height */
    );

    line(120, 111, 85, 75);
    // line(30, 50, 85, 75);
    // line(30, 50, 85, 75);
  }