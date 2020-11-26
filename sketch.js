
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var score=0;
var gameState=1;
var END=0;
var PLAY=1;
var gameover;


function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(windowWidth,windowHeight);
  monkey=createSprite(80,windowHeight-100,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;

  ground=createSprite(400,windowHeight-70,1900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;  

  gameover=createSprite(200,windowHeight-200,10,10);
  gameover.visible=false;
  
 obstacleGroup=new Group();
  foodGroup=new Group();
}



function draw() {

 
  
  background("lightblue");
 
  if (gameState===PLAY)
{  stroke("black");
  textSize(15);
  text("survivaltime:"+survivaltime,100,50);  
survivaltime=survivaltime+Math.round(getFrameRate()/60);
 
  if (monkey.isTouching(foodGroup))
  {

    score=score+1;
 foodGroup.destroyEach();
  }
  
 
  if(ground.x<0){
ground.x=ground.width/2;
  }
switch(score){
  case 10:monkey.scale=0.12;
    break;
  case 20:monkey.scale=0.14;
  break;
  case 30:monkey.scale=0.16;
    break;
    case 43:monkey.scale=0.20;
    break;
    case 992:monkey.scale=0.50
  break;  
  default:break;
}  
  if (keyDown("space" || touches)){
    monkey.velocityY=-22;
    touches=[];
  }
gameover.visible=false;
  monkey.velocityY=monkey.velocityY+0.9;
 
  monkey.collide(ground);
 
  if (obstacleGroup.isTouching(monkey)){

    monkey.scale=0.1;
    gameState=END;
  }
  
} else if(gameState===END)
  {
   if(mousePressedOver(gameover) ) {
     reset();
     
    }
    gameover.visible=true;
    foodGroup.destroyEach();
    survivaltime=0;
      ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
 foodGroup.setLifetimeEach(-1);
   textSize(20);
    fill("red");
    text("Oh no monkey has injured !",100,200);
  }
 
 
  obstacle();
 food();
  drawSprites();
  fill("black");
   text("Bananas has ate :"+score,100,100);
  
}






function food(){
  if (frameCount%80===0){
    
    banana=createSprite(600,200,15,15);
    banana.velocityX=-5;
 banana.y=random(120,200);
 banana.addImage(bananaImage);
banana.scale=0.1;
  banana.lifetime=300;
  foodGroup.add(banana);
  }
 
}

function obstacle(){
  if (frameCount%300===0){
  //  stone.collide(ground);
    stone=createSprite(800,windowHeight-100,10,40);
    stone.velocityX=-4;
    stone.addImage(obstaceImage);
    stone.scale=0.15;
    stone.lifetime=300;
    obstacleGroup.add(stone);
  }
  
  
}
  
function reset(){
   gameState = PLAY;
  gameover.visible = false;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  score=0;
  survivaltime=0;
  
}