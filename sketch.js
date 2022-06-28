var towerImg, tower;
var doorImg, door, doorsGroup, door1, door2, door3, door4, door5, door6;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY = 1
var END = 0
var gameState = PLAY
var score = 0
var edge


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.36
  ghost.velocityY = 5 

  edge = createEdgeSprites()
  doorsGroup = createGroup()
  climbersGroup = createGroup()
}

function draw() {
  background(200);
  if(gameState === PLAY){ 
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("space")){
    ghost.velocityY = -8
  }
  if(keyDown("right")){
    ghost.velocityX = ghost.velocityX + 2
  }
  if(keyDown("left")){
    ghost.velocityX = ghost.velocityX - 2   
  }
  


  ghost.velocityY = ghost.velocityY + 0.6

 
  console.log(gameState)
    spawnDoors();
    spawnClimbers()
    
    if(ghost.isTouching(climbersGroup)){
        gameState = END;
    }
    if(ghost.y >  600){
      gameState = END
    }
    if(ghost.isTouching(edge[0]) || ghost.isTouching(edge[1])){
      gameState = END
    }
  }
   else if (gameState === END) {
    
    // textSize(50) 
    //  text("Game Over :(", 200,300)
    doorsGroup.setLifetimeEach(-1);
    tower.velocityY = 0
    ghost.velocityY = 0  
     doorsGroup.setVelocityYEach(0);
     climbersGroup.setVelocityYEach (0)
     textSize(50)
     text("Game Over :(", 200,300)

   }
  

  drawSprites() 
}

function spawnDoors(){
if(frameCount % 50 === 0){
  var door = createSprite(300, 0, 70, 70);
  console.log(door)
   door.velocityY = (6 + score/100);
    
    door.scale = 0.75;
    door.lifetime = 300;
    door.addImage (doorImg)
  
    doorsGroup.add(door);

}
}

function spawnClimbers(){
if(frameCount % 50 === 0){
  var climber = createSprite(300, 40 , 70, 70)
  climber.velocityY = (6 + score/100)

    climber.scale = 0.75
    climber.lifetime = 300
    climber.addImage (climberImg)

    climbersGroup.add(climber)
}
}

