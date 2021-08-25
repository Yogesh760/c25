const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase;
var computer, computerBase;

//Declare an array for arrows playerArrows = [ ]
var playerArrows = [];
var computerArrows = []
var arrow;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  computerBase = new ComputerBase(
    width - 300,
    random(450, height - 300),
    180,
    150
  );
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );
  computerArcher = new ComputerArcher(
    width - 340,
    computerBase.body.position.y - 180,
    120,
    120
  );
  
 //Function to manage player Arrows
handlePlayerArcher(); 



}

function draw() {
  background(180);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

 
  playerBase.display();
  player.display();
  

  computerBase.display();
  computer.display();
  
  playerArcher.display();
  computerArcher.display()

 // Use for loop to display arrow using showArrow() function
 for (var i = 0; i < playerArrows.length; i++) {
  showArrows(i, playerArrows);
}

}

function keyPressed() {
  if(keyCode === 32){
    // create an arrow object and add into an array ; set its angle same as angle of playerArcher

  }
}

function keyReleased () {
  if(keyCode === 32){
    //call shoot() function for each arrow in an array playerArrows
    if (playerArrows.length) {
      var angle = playerArcher.body.angle+PI/2;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }


}
//Display arrow and Tranjectory
function showArrows(index, arrows) {
  arrows[index].display();
 
}

  function handlePlayerArcher() {
    if (!playerArcher.collapse && !computerArcher.collapse) {
      setTimeout(() => {
        var pos = playerArcher.body.position;
        var angle = playerArcher.body.angle;
        var moves = ["UP", "DOWN"];
        var moves = random(moves);
        var angleValue;
  
        if (player === "UP") {
          angleValue = 0.1;
        } else {
          angleValue = -0.1;
        }
        angle += angleValue;
  
        var arrow = new PlayerArrow(pos.x, pos.y, 100, 10, angle);
  
        Matter.Body.setAngle(playerArcher.body, angle);
        Matter.Body.setAngle(playerArcher.body, angle);
  
        playerArrows.push(arrow);
        setTimeout(() => {
          playerArrows[playerArrows.length - 1].shoot(angle);
        }, 100);
  
        handlePlayerArcher();
      }, 2000);
    }
  }

