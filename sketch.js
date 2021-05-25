var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage;
var FoodGroup, obstaclesGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group();
  obstaclesGroup =new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
   
    if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
    
if (FoodGroup.isTouching(player)){
  FoodGroup.destroyEach();
  score = score + 2;
  player.scale += +0.03
  }

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();
      
  if (obstaclesGroup.isTouching(player)){
  gameState = END;
}

}else if (gameState === END){
backgr.velocityX = 0;
 player.visible = false;

FoodGroup.destroyEach();
obstaclesGroup.destroyEach();
textSize(30);
fill(255);
text("Game Over!", 300, 220);
}

drawSprites();

textSize(25);
fill("black");
text("Score: " + score, 700,25);
}

function spawnFood(){
  if (frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
 FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 400 === 0){
    var stone = createSprite(200,400,40,10);
    stone.y = random(200,400);
    stone.addImage(stoneImage);
    stone.scale = 0.04;
    stone.velocityX = -4;

    stone.lifetime = 300;
    player.depth = stone.depth + 1;
    obstaclesGroup.add(stone);
  }
}