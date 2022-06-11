var status= "";
objects=[];

function setup(){
    canvas= createCanvas(600,400);
    canvas.center();
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status- detecting objects";
}

img= "";

function preload(){
    img= loadImage('dog_cat.jpg');
}

function draw(){
    image(img,0, 0, 600, 400);
    
    if(status!=""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Objects Detected";
            percent= Math.floor(objects[i].confidence*100);

            fill("red");
            stroke('red');

            text(objects[i].label + " " + percent+ "%",  objects[i].x+15, objects[i].y+15 );
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
    }
}

function modelLoaded(){
    console.log("model Loaded");
    status=true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}