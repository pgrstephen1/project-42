var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, backGroundImg;
var FoodGroup, obstacleGroup
var score = 0;
var survival_time = 0;

var gamestate = 0;
var PLAY = 0;
var END = 1;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  backGroundImg = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(800,400);
FoodGroup = new Group() ;
obstacleGroup = new Group();
  
 monkey = createSprite(80,315,20,20);
  monkey.addAnimation ("moving", monkey_running);
  monkey.scale = 0.1;
  //monkey.debug = true;
  monkey.setCollider("circle",0,0,325);
}


function draw() {
background(backGroundImg);
  


  if(gamestate === PLAY){

    ground = createSprite(400,350,900,10);
    ground.velocityX = -7;
  ground.x = ground.width/2;
  ground.visible = false;

  textSize(20);
  text("Survival time: " + survival_time, 30,30);
  text("Score: "+ score, 300, 30);
    
    if(keyDown('space') && monkey.y >= 310){
    monkey.velocityY = -16;
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
    
    if(monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach();
  score = score+1;
  }
  
  survival_time = Math.round(frameCount / 30);
    
    SpawnBanana();
SpawnObstacle();
}
  
   monkey.collide(ground);
  
  if(monkey.isTouching(obstacleGroup)){
    gamestate = 1;
  }
  
  if(gamestate === 1){
    ground.velocityX = 0;
    ground.destroy();
    monkey.destroy();
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  
    textSize(30);
    text("Game Over", 400,250);
  }


drawSprites();
}

function SpawnBanana()
{
  if(frameCount % 150 === 0){
     banana = createSprite(800,200,10,10);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.y = Math.round(random(200,315));
    banana.lifetime = 1500;
   FoodGroup.add(banana);
 //   banana.debug = true;
  }
}

function SpawnObstacle()
{
  if(frameCount % 200 === 0){
    obstacle = createSprite(800,325,10,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    obstacle.lifetime = 1500;
    obstacle.setCollider("circle",0,0,210);
   obstacleGroup.add(obstacle);
   // obstacle.debug = true;
  }
}
