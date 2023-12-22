var space,rocket,star,astroid;
var spaceImg,rocketImg,starImg,astroidImg;
var score = 0;
var starG,astroidGroup;
var gameOver,restart;
var gameOverImg,restartImg ;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  spaceImg = loadImage("space.png");
  rocketImg = loadImage("rocket.png");
  starImg = loadImage("star.png");
  astroidImg = loadImage("astroid.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);

space=createSprite(width/2,200);
space.addImage(spaceImg);
space.spaceY = 4;

rocket = createSprite(width/2,height-20,20,20);
rocket.addImage(rocketImg);
rocket.scale=0.04;
  
gameOver = createSprite(width/2,height/2);
gameOver.addImage(gameOverImg);
  
restart = createSprite(width/2,height/2+40);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;  

starG=new Group();
astroidGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  rocket.x = World.mouseX;
  rocket.y= height-20;
  rocket.visible=true ;
  gameOver.visible=false;
  restart.visible=false;

  edges= createEdgeSprites();
  rocket.collide(edges);
  
   if(space.y > height ){
     space.y = height/2;
   }
  
    createstar();
    createastroid();

    if (starG.isTouching(rocket)) {
      starG.destroyEach();
      score=score + 50;
    }
    else{
      if(astroidGroup.isTouching(rocket)) {
        gameState=END;}
    } 
     
    }
    else if(gameState===END){
        rocket.visible=false ;

        rocket.x=width/2;
        rocket.y=height/2;

        gameOver.visible=true;
        restart.visible=true;
        
        
        starG.destroyEach();
        astroidGroup.destroyEach();
        
        starG.setVelocityYEach(0);
        astroidGroup.setVelocityYEach(0);

        if(mousePressedOver(restart)) {
          reset();
        }
  }
 
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ score,width-150,30);
  }



function createstar() {
  if (World.frameCount % 150 == 0) {
  var star = createSprite(Math.round(random(50, width-50),40, 10, 10));
  star.addImage(starImg);
  star.scale=0.02;
  star.velocityY = 5;
  star.lifetime = 200;
  starG.add(star);
  }
}

function createastroid(){
  if (World.frameCount % 160 == 0) {
  var astroid = createSprite(Math.round(random(50, width-50),40, 10, 10));
  astroid.addImage(astroidImg);
  astroid.scale=0.04;
  astroid.velocityY = 4;
  astroid.lifetime = 200;
  astroidGroup.add(astroid);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  console.log("Aca")
  astroidGroup.destroyEach();
  starG.destroyEach();
  

  
 
  
  score = 0;
}
