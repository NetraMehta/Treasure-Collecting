var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
    pathImg = loadImage("Road.png");
    boyImg = loadAnimation("runner1.png","runner2.png");
    cashImg = loadImage("cash.png");
    diamondsImg = loadImage("diamonds.png");
    jwelleryImg = loadImage("jwell.png");
    swordImg = loadImage("sword.png");
    endImg =loadAnimation("gameOver.png");
}

function setup(){
  
    createCanvas(600,600);
    // Moving background
    path=createSprite(300,300);
    path.addImage(pathImg);


    //creating boy running
    boy = createSprite(70,530,20,20);
    boy.addAnimation("SahilRunning",boyImg);
    boy.addAnimation("GameOver", endImg);
    boy.scale=0.08;


    cashG=new Group();
    diamondsG=new Group();
    jwelleryG=new Group();
    swordGroup=new Group();

    boy.setCollider("circle", 0, 0, 500);

}

function draw() {

    background(0);
    boy.x = World.mouseX;

    edges= createEdgeSprites();
    boy.collide(edges);

    path.velocityY = (4 + treasureCollection/50);

    //code to reset the background
    if(path.y > 600 ){
      path.y = height/2;
    }

     if(gameState === PLAY) {
        createCash();
        createDiamonds();
        createJwellery();
        createSword();

        if (cashG.isTouching(boy)) {
          cashG.destroyEach();
          treasureCollection = treasureCollection+10;
        }
        else if (diamondsG.isTouching(boy)) {
          diamondsG.destroyEach();
          treasureCollection = treasureCollection+30;
        }
        else if(jwelleryG.isTouching(boy)) {
          jwelleryG.destroyEach();
          treasureCollection = treasureCollection+20;
        }
        else if(swordGroup.isTouching(boy)) {
            swordGroup.destroyEach();
            gameState = END;
        }
     }
    else if(gameState === END){
        path.velocityY = 0;
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        boy.x = 300;
        boy.y = 300;
        boy.changeAnimation("GameOver", endImg);
        boy.scale = 1;
    }

    drawSprites();
    
    textSize(30);
    fill("gold");
    textFont("Comic Sans MS")
    text("Treasure: "+ treasureCollection,220,30);

}

function createCash() {
    if (World.frameCount % 80 == 0) {
    var cash = createSprite(Math.round(random(50, 550),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = (4 + treasureCollection/50);
    cash.lifetime = 200;
    cashG.add(cash);
    }
}

function createDiamonds() {
    if (World.frameCount % 150 == 0) {
    var diamonds = createSprite(Math.round(random(50, 550),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = (4 + treasureCollection/50);
    diamonds.lifetime = 200;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
    if (World.frameCount % 120 == 0) {
    var jwellery = createSprite(Math.round(random(50, 550),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = (4 + treasureCollection/50);
    jwellery.lifetime = 200;
    jwelleryG.add(jwellery);
    }
}

function createSword(){
    if (World.frameCount % 100 == 0) {
    var sword = createSprite(Math.round(random(50, 550),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = (4 + treasureCollection/50);
    sword.lifetime = 200;
    swordGroup.add(sword);
    }
}