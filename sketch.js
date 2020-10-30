//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogIMG1, dogIMG2;
var addFeed, feed, noFood;
var fedTime, lastFed;
var foodObj;
var ground;



function preload()
{
  //load images here
  dogIMG1 = loadImage("images/dogImg.png");
  dogIMG2 = loadImage("images/dogImg1.png");
  milk = loadImage("images/Milk.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);

  //foodObj = new Food();

  /*feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);*/

  addFeed=createButton("Add Food");
  addFeed.position(700,20);
  addFeed.mousePressed(addFoods);

  noFood=createButton("Feed Dog");
  noFood.position(600,20);
  noFood.mousePressed(feedDog);

  dog = createSprite(700, 250, 170, 170);
  dog.addImage(dogIMG1);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);

  /*if (foodS+1) {
    image(milk,720,220,70,70);
  }*/

  var x=80,y=100;

  imageMode(CENTER);
  //image(milk,720,220,70,70);

  if (foodS!=0) {
      for(var i=0; i<foodS; i++){
          if (i%10==0) {
              x=80;
              y=y+50;
          }
          image(milk,x,y,50,50);
          x=x+30;
      }
  }
  console.log("before " + lastFed);
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if (lastFed>=12) {
    text("Last Fed: "+ lastFed%12 +" PM",350,30);
  }else if (lastFed == 0) {
    text("Last Fed: 12 AM", 350,30);
  }else{
    text("Last Fed: " + lastFed + " AM", 350,30);
  }

  console.log("after " + lastFed);


  
  drawSprites();

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  }else{
    x = x - 1;
  }

   database.ref('/').update({
     Food:x
   })
}

/*function feedDog(){
  dog.addImage(dogIMG2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}*/

function addFoods() {
  foodS++;
  dog.addImage(dogIMG1);
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog() {
  foodS--;
  dog.addImage(dogIMG2);
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })

}




