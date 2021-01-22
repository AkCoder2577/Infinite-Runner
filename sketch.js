var towerImg, tower;
var doorImg, door, doorsGroup;
var gameoverImage
var ghost, ghostImg;

var gameState = "play"

function preload(){
  towerImg = loadImage("Screenshot (379).png");
  doorImg = loadImage("685756.gif");
  gameoverImage = loadImage("Screenshot (380).png");
  ghostImg = loadImage("toppng.com-hot-air-balloon-525x668.png");
  spookySound = loadSound("Sound.mp3");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.scale = 3;
  tower.velocityY = 2;
  
  doorsGroup = new Group();
 
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("up_arrow")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
   
    if(doorsGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("red");
    textFont("comic sans ms")
    textSize(30);
    text("Game Over", 230,250)
    
  }
  fill("red");
  textFont("comic sans ms")
  textSize(30);
  text("Avoid Thorns In Your Ride",200,30);


}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
  
    
    
    door.x = Math.round(random(120,400));
   
    door.addImage(doorImg);
    door.scale = 0.2;
   
    
    door.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
   
    //add each door to the group
    doorsGroup.add(door);
   
  }
}

