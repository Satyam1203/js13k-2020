let s = 32;
let canvas = document.getElementById("game");
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;
let game_over = 0;

const img = document.getElementById("player_object");
let ctx = canvas.getContext("2d");
let GameObjectX;
let GameObjectY;
// let sizeX = 3 * s;
let direction = "r";

class FinalStage {
  constructor() {
    this.x = 640 - 32;
    this.y = 0;
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, 32, 32);
  }
}

class Fruit {
  constructor() {
    this.x = Math.floor((Math.random() * 640) / 32) * 32;
    this.y = Math.floor((Math.random() * 640) / 32) * 32;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 32, 32);
  }
}

class Obstacle {
  constructor(x, y, size, increment) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.increment = increment;
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.size, s);
  }
  move() {
    ctx.clearRect(this.x, this.y, this.size, s);
    ctx.fillStyle = "white";
    this.x += this.increment;
    if (this.x >= 640 - this.size) this.increment = -10;
    if (this.x <= 0) this.increment = 10;
    ctx.fillRect(this.x, this.y, this.size, s);
    console.log("updated");
  }
  colloide() {
    return (
      (player.y - 32 === this.y ||
        player.y === this.y ||
        player.y + 32 === this.y) &&
      player.x + 32 >= this.x &&
      player.x <= this.x + this.size
    );
  }
}

let obstacle1 = new Obstacle(32, 96, 192, 10);
let obstacle2 = new Obstacle(160, 352, 160, 12);
let obstacle3 = new Obstacle(224, 224, 184, 15);
let obstacle4 = new Obstacle(320, 480, 160, 18);
let fruit1 = new Fruit();
const final = new FinalStage();

class GameObject {
  constructor(size) {
    this.size = size;
    this.x = CANVAS_WIDTH / 2 - this.size;
    this.y = CANVAS_HEIGHT - this.size;
    ctx.fillStyle = "black";
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  update(direction) {
    // console.log(this.x, this.y);
    ctx.clearRect(this.x, this.y, this.size, this.size);
    if (direction === "r") {
      if (this.x + 2 * this.size <= CANVAS_WIDTH) this.x += this.size;
    } else if (direction === "b") {
      if (this.y + this.size < CANVAS_WIDTH) this.y += this.size;
    } else if (direction === "l") {
      if (this.x - this.size >= 0) this.x -= this.size;
    } else if (direction === "t") {
      if (this.y > 0) this.y -= this.size;
    }
    ctx.fillStyle = "black";
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }
  won() {
    return this.x === final.x && this.y === final.y;
  }
}

let player = new GameObject(32);

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

var u = setInterval(() => {
  console.log(player.y, obstacle1.y);
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
    clearInterval(u);
    return;
  }
  if(player.won()){
    console.log("Game Won");
    game_over = 1;
    clearInterval(u);
    return;
  }
}, 20);
