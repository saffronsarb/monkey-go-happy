var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running , monkey_collided ;
var banana ,bananaImage, obstacle, obstacleImage ;
var FoodGroup, obstacleGroup ;
var score ;
var ground;
var survivalTime=0;


function preload(){
  
  
  monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
 createCanvas(600, 600);
  
  monkey = createSprite(60,520,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(300,580,1200,20);
   ground.velocityX = -4;
   ground.x = ground.width/2;
  console.log(ground.x)
  
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  score=0;
}


function draw() {
  
 background("lightblue");
   if(gameState === PLAY){
  
 
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
      
       monkey.velocityY = monkey.velocityY + 0.8
}

   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //gravity for mokey  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if(monkey.isTouching(FoodGroup)){

      FoodGroup.destroyEach()
      score = score + 10 ;
      
      }
 
   if(monkey.isTouching(obstacleGroup)){
    
     gameState = END;
     
   }
  monkey.collide(ground);
 spawnfood()
 spawnobstacles()
 drawSprites();
//ground.visible = false;

  textSize(20);
  
  text("score: "+ score, 450,50) ;
  
  
   
    
  
  textSize(20);
  fill("black");
  text("survival Time: "+survivalTime,100,50);

}
 if(gameState===END) {
   
    textSize(20);
     text("GAME OVER",230,300)
   
   
 }
}

function spawnfood() {
  
  if(World.frameCount%80===0){
    banana=createSprite(500,200,20,20);
    banana.addAnimation("moving", bananaImage);
  banana.y=Math.round(random(140,300))
    banana.scale=0.15
  banana.velocityX=-8
  banana.lifetime=100
  FoodGroup.add(banana);
  }
}

function spawnobstacles() {
  
  if(World.frameCount%300===0){
    obstacle=createSprite(500,520,20,20);
    obstacle.addAnimation("moving",obstacleImage);
  obstacle.y=Math.round(random(540,540))
    obstacle.scale=0.2
  obstacle.velocityX=-8
  obstacle.lifetime=100
  obstacleGroup.add(obstacle);
  }
}