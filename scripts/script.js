let s = 32;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;
let game_over = 0;

const player_object = document.getElementById("player_object");
const food_object = document.getElementById("food_object");
const monster_object = document.getElementById("monster_object");
let direction = "r";

class FinalState {
  constructor() {
    this.x = 640 - 32;
    this.y = 0;
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, 32, 32);
  }
}
let player = new Player(32);
const final = new FinalState();

const restart = () => window.location.reload();

const level1 = () => {
  window.event.target.disabled = true;
  game_over = 0;
  let obstacle1 = new Obstacle(
    32,
    96,
    192,
    Math.floor(Math.random() * 12) + 10
  );
  let obstacle2 = new Obstacle(
    160,
    352,
    160,
    Math.floor(Math.random() * 12) + 10
  );
  let obstacle3 = new Obstacle(
    224,
    224,
    184,
    Math.floor(Math.random() * 12) + 10
  );
  let obstacle4 = new Obstacle(
    320,
    480,
    160,
    Math.floor(Math.random() * 12) + 10
  );
  let fruit1 = new Fruit();
  let fruit2 = new Fruit();
  let fruit3 = new Fruit();
  let fruit4 = new Fruit();

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
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      clearInterval(gameLoop);
      return;
    }
  }, 20);
};
class Bullet {
  constructor() {
    this.x = 8;
    this.y = 8;
    this.fired = 0;
    this.posx = 0;
    this.posy = 0;
  }
  initialize() {
    this.fired = 1;
    this.posx = player.x + 32;
    this.posy = player.y + 12;
    ctx.fillStyle = "red";
    ctx.fillRect(this.posx, this.posy, this.x, this.y);
  }
  fire() {
    ctx.clearRect(this.posx, this.posy, this.x, this.y);
    if (this.posx > CANVAS_WIDTH - 64) {
      this.fired = 0;
      this.posx = -16;
    } else {
      this.posx += 16;
    }
    ctx.fillStyle = "red";
    ctx.fillRect(this.posx, this.posy, this.x, this.y);
  }
  kills(monster) {
    if (
      this.posx > monster.posx &&
      this.posy >= monster.posy &&
      this.posy <= monster.posy + monster.size
    ) {
      this.fired = 0;
      return true;
    }
    return false;
  }
}

class Monster {
  constructor() {
    this.size = 64;
    this.posy = 192;
    this.posx = CANVAS_WIDTH - this.size;
    this.speed = -3;
    this.isRemoved = 0;
    ctx.drawImage(monster_object, this.posx, this.posy, this.size, this.size);
  }
  move() {
    ctx.clearRect(this.posx, this.posy, this.size, this.size);
    this.posy += this.speed;
    if (this.posy >= 640 - this.size) this.speed = -this.speed;
    if (this.posy <= 0) this.speed = -this.speed;
    ctx.drawImage(monster_object, this.posx, this.posy, this.size, this.size);
  }
  remove() {
    ctx.clearRect(this.posx, this.posy, this.size, this.size);
  }
  killed() {
    ctx.clearRect(this.posx, this.posy, this.size, this.size);
  }
}

const level2 = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  game_over = 0;
  player.x = 0;
  player.y = CANVAS_HEIGHT / 2;

  let fires = 0;
  let monsterHits = 0;
  let bullet = new Bullet();
  let monster = new Monster();

  document.onkeydown = function (e) {
    if (game_over) return;
    if (e.keyCode == 38 || e.keyCode == 87) {
      direction = "t";
      player.update(direction);
    } else if (e.keyCode == 40 || e.keyCode == 83) {
      direction = "b";
      player.update(direction);
    } else if ((e.keyCode == 37 || e.keyCode == 65) && monster.isRemoved) {
      direction = "l";
      player.update(direction);
    } else if ((e.keyCode == 39 || e.keyCode == 68) && monster.isRemoved) {
      direction = "r";
      player.update(direction);
    } else if (e.keyCode === 32) {
      if (fires >= 5) return;
      if (
        !bullet.fired &&
        (bullet.posx >= CANVAS_WIDTH - monster.size || bullet.posx <= 0)
      ) {
        fires++;
        bullet.initialize();
      }
    }
  };
  var gameLoop = setInterval(() => {
    monster.move();
    if (bullet.fired) {
      bullet.fire();
      if (bullet.kills(monster)) {
        monster.killed();
        monsterHits++;
        if(monster.speed < 0) monster.speed-=2;
        else monster.speed+=2;
        console.log("Monster Hit");
      }
    }
    if (monsterHits === 3) {
      monster.remove();
      monster.isRemoved = 1;
      ctx.fillStyle = "green";
      ctx.fillRect(CANVAS_WIDTH - 32, CANVAS_HEIGHT - 32, 32, 32);
    }
    if (player.x === CANVAS_WIDTH - 32 && player.y === CANVAS_HEIGHT - 32) {
      console.log("Game Won");
      game_over = 1;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      clearInterval(gameLoop);
      return;
    }
  }, 20);
};
