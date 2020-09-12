let s = 32;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;
let game_over = 0;

const player_object = document.getElementById("player_object");
const food_object = document.getElementById("food_object");
let direction = "r";

class FinalState {
  constructor() {
    this.x = 640 - 32;
    this.y = 0;
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, 32, 32);
  }
}

let obstacle1 = new Obstacle(32, 96, 192, 10);
let obstacle2 = new Obstacle(160, 352, 160, 20);
let obstacle3 = new Obstacle(224, 224, 184, 15);
let obstacle4 = new Obstacle(320, 480, 160, 18);
let fruit1 = new Fruit();
let fruit2 = new Fruit();
let fruit3 = new Fruit();
let fruit4 = new Fruit();
const final = new FinalState();

let player = new Player(32);

document.onkeydown = function (e) {
  if (game_over) return;
  if (e.keyCode == 37 || e.keyCode == 65) {
    direction = "l";
    player.update(direction);
  } else if (e.keyCode == 38 || e.keyCode == 87) {
    direction = "t";
    player.update(direction);
  } else if (e.keyCode == 39 || e.keyCode == 68) {
    direction = "r";
    player.update(direction);
  } else if (e.keyCode == 40 || e.keyCode == 83) {
    direction = "b";
    player.update(direction);
  }
  //   console.log(direction);
};

var gameLoop = setInterval(() => {
  // console.log(player.y, obstacle1.y);
  obstacle1.move();
  obstacle2.move();
  obstacle3.move();
  obstacle4.move();
  if (
    obstacle1.colloide() ||
    obstacle2.colloide() ||
    obstacle3.colloide() ||
    obstacle4.colloide()
  ) {
    console.log("Game Over");
    game_over = 1;
    clearInterval(gameLoop);
    return;
  }
  if (fruit1.eaten()) fruit1.displaceFood();
  if (fruit2.eaten()) fruit2.displaceFood();
  if (fruit3.eaten()) fruit3.displaceFood();
  if (fruit4.eaten()) fruit4.displaceFood();
  if (
    player.destination() &&
    fruit1.val &&
    fruit2.val &&
    fruit3.val &&
    fruit4.val
  ) {
    console.log("Game Won");
    game_over = 1;
    clearInterval(gameLoop);
    return;
  }
}, 20);
