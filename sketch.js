var PLAY =1;
var END =0;
var gameState = PLAY;
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var foodGroup,obstacleGroup;
var survivalTime=0;
var ground;
var gameOver,gameOverImage;

function preload(){
monkey_running=loadAnimation("monkey.jpg");
bananaImage = loadImage("banana.jpg");
obstacleImage = loadImage("obstacle.jpg");
gameOverImage = loadImage("gameOver.png");
}

function setup(){
createCanvas(600,600);
monkey=createSprite(100,500,20,20);
monkey.addAnimation("monkey_running",monkey_running);
monkey.scale=0.2;

gameOver = createSprite(200,300,20,30);
gameOver.addImage(gameOverImage);
gameOver.scale =0.5;

//obstacle =createSprite(300,500,20,20);

ground=createSprite(100,570,600,20);
ground.x =ground.width/2;

obstacleGroup = createGroup();
bananaGroup = createGroup();

score =0;
}
function draw() {
background("green");

if(gameState === PLAY){
    gameOver.visible = false;
}
if(gameState === END){
    gameOver.visible = true;
}


 if (ground < 0){
ground.x =ground.width/2;
 }

 spawnObstacles();
 spawnBanana();

 if(keyDown("space")&& monkey.y>=300){
     monkey.velocityY =-12;
 }

 if (bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score=score+1;
 }


monkey.velocityY =monkey.velocityY+0.8

monkey.collide(ground);

drawSprites();
fill("white");
textSize(20);
text("score:"+score,500,50);


fill("black")
textSize(20)
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time:"+survivalTime,100,50)
}

function spawnObstacles(){
if(frameCount % 150===0){
        var obstacle =createSprite(500,530,20,20);
        obstacle.addImage(obstacleImage);
        obstacle.velocityX =-6;
        obstacle.scale =0.25;
        obstacle.lifeTime =500;

obstacleGroup.add(obstacle);
    }
}

function spawnBanana(){
    if(frameCount%160===0){
        banana =createSprite(600,100,40,10);
        banana.y =Math.round(random(250,300));
        banana.addImage(bananaImage);
        banana.scale=0.2;
        banana.velocityX =-3;

        monkey.lifeTime =500;

        banana.depth =monkey.depth;
        monkey.depth =monkey.depth+1;

        bananaGroup.add(banana);
    }
}

