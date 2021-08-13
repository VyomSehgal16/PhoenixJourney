var obstacle, PC, obstacleGroup,obstacleImg1,coinImg, diamondImg, NPC, coin, coinsGroup, car, diamond, diamondGroup, backgroundimg, ground, groundImage, bg;
var gameState = "play";
var score = 0;
var lives = 5;

function preload(){
    backgroundimg = loadImage("Background(1).png");
    car = loadImage("car21.png");
    obstacleImg1 = loadImage("obstacle2.png");
    coinImg = loadImage("coin2.png");
    diamondImg = loadImage("diamond2.png");
}

function setup(){

    createCanvas(500,500);

    bg = createSprite(250,250,500,500);
    bg.addImage(backgroundimg);
    bg.scale = 2.2;
    ground = createSprite(250,500,500,20);
    ground.shapeColor = "black";
    PC = createSprite(50,480,30,30);
    PC.addImage(car);
    PC.scale = 0.24;
    obstacleGroup = new Group();
    coinsGroup = new Group();
    diamondGroup = new Group();

}

function draw(){
    
    background("yellow");
    drawSprites();
    textSize(25);
    if(gameState === "play"){
        fill('black');
        text("Score: " + score, 280, 50);
        fill('red');
        text("Lives: " + lives, 280, 75);
        bg.velocityX = -4;
        ground.velocityX = -4;
        if(keyDown("space")){
            PC.velocityY = -13;
        }
        PC.velocityY = PC.velocityY + 0.7;
        if (ground.x < 50){
            ground.x = ground.width/2;
        }
        if (bg.x < 30){
            bg.x = bg.width/2;
        }
        if(obstacleGroup.isTouching(PC)){
            obstacleGroup.destroyEach();
            lives--;
        }
        if(coinsGroup.isTouching(PC)){
            coinsGroup.destroyEach();
            score = score + 5;
        }
        if(diamondGroup.isTouching(PC)){
            diamondGroup.destroyEach();
            score = score + 25;
        }
        if(lives === 0){
            gameState = "end";
        }
        spawnObstacles();
        spawnCoins();
        spawnDiamonds();
    }
    if(gameState === "end"){
        bg.velocityX = 0;
        ground.velocityX = 0;
        PC.velocityY = 0;
        PC.destroy();
        ground.destroy();
        bg.destroy();
        coinsGroup.destroyEach();
        diamondGroup.destroyEach();
        obstacleGroup.destroyEach();
        textSize(50);
        fill('black');
        text("GAME OVER",120,250);
    }
    PC.collide(ground);

}

function spawnObstacles(){
    var randomDistance = Math.round(random(100,150));
    if(frameCount % randomDistance === 0) {
        obstacle = createSprite(500,450,45,70);
        obstacle.height = Math.round(random(100,300));
        var RandomImg = Math.round(random(1,6));
        switch (RandomImg){
            case 1: obstacle.addImage(obstacleImg1);
                    obstacle.scale = 0.35;
            break;
            case 2: obstacle.addImage(obstacleImg1);
                    obstacle.scale = 0.3;
            break;
            case 3: obstacle.addImage(obstacleImg1);
                    obstacle.scale = 0.25;
            break;
            case 4: obstacle.addImage(obstacleImg1);
                    obstacle.scale = 0.2;
            break;
            case 5: obstacle.addImage(obstacleImg1);
                    obstacle.scale = 0.15;
            break;
            case 6: obstacle.addImage(obstacleImg1);
                    obstacle.scale = 0.1;
            break;
            default: break;
        }
        obstacle.shapeColor = "black";
        obstacle.velocityX = -4;
        obstacle.lifetime = 350;
        obstacleGroup.add(obstacle);
    }
}

function spawnCoins(){
    if(frameCount % 117 === 0) {
        coin = createSprite(500,400,20,20);
        coin.y = Math.round(random(50,400));
        coin.shapeColor = "yellow";
        coin.addImage(coinImg);
        coin.scale = 0.05;
        coin.velocityX = -4;
        coin.lifetime = 350;
        coinsGroup.add(coin);
    }
}
function spawnDiamonds(){
    if(frameCount % 291 === 0) {
        diamond = createSprite(500,400,30,30);
        diamond.y = Math.round(random(50,400));
        diamond.shapeColor = "blue";
        diamond.addImage(diamondImg);
        diamond.scale = 0.14;
        diamond.velocityX = -6;
        diamond.lifetime = 350;
        diamondGroup.add(diamond);
    }
}