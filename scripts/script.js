let s = 32;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;
let game_over = 0;
let level = 1;

const player_object = document.getElementById("player_object");
const food_object = document.getElementById("food_object");
const monster_object = document.getElementById("monster_object");
let direction = "r";

const round_details = [
  {
    description: `Billy wants to go to other village and on his way, he finds a field of apple. He loves apples and he wants to eat all of them present in the field but there are some obstacles preventing him on his way to the destination. Help him go to other village by <b>avoiding obtacles</b>(not even touch them). The door(marked green) can be used once per level after eating all apples.`,
  },
  {
    description: `While eating the apples, the field owner saw him and tied him(now he <b>can only move vertically</b>). A monster is here to keep an eye on him & prevent him from escaping. He has 5 bullets and he has to hit atleast 3 to the monster and then he can easily move(horizontally too) and get out of this field to reach his destination village(marked green). Help him do so. <p>Use Spacebar to shoot</p>`,
  },
];

document.getElementById("level").innerHTML = 1;
document.getElementById("desc").innerHTML = round_details[0].description;

const drawNotFound = () => {
  ctx.font = "80px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText("404 - Not Found!", 20, CANVAS_HEIGHT / 2);
};

const drawFound = () => {
  ctx.font = "80px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText("200 - Found!", 60, CANVAS_HEIGHT / 2);
};

class FinalState {
  constructor() {
    this.x = 640 - 32;
    this.y = 0;
  }
  draw(y) {
    this.y = y;
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, 32, 32);
  }
}
let player = new Player(32);
const final = new FinalState();

const restart = () => window.location.reload();

drawNotFound();

const play = () => {
  if (level === 1) {
    level1();
  } else {
    level2();
    document.getElementById("level").innerHTML = 2;
    document.getElementById("desc").innerHTML = round_details[1].description;
  }
};

const level1 = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.draw();
  final.draw(0);
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
    if (e.keyCode === 37 || e.keyCode === 65) {
      direction = "l";
      player.update(direction);
    } else if (e.keyCode === 38 || e.keyCode === 87) {
      direction = "t";
      player.update(direction);
    } else if (e.keyCode === 39 || e.keyCode === 68) {
      direction = "r";
      player.update(direction);
    } else if (e.keyCode === 40 || e.keyCode === 83) {
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
      game_over = 1;
      clearInterval(gameLoop);
      document.getElementById("status").innerText = "Game Over";
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
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      clearInterval(gameLoop);
      level = 2;
      play();
      return;
    }
  }, 20);
};

const level2 = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  game_over = 0;
  player.x = 0;
  player.y = CANVAS_HEIGHT / 2;
  player.draw();

  let fires = 0;
  let monsterHits = 0;
  let bullet = new Bullet();
  let monster = new Monster();

  document.onkeydown = function (e) {
    if (game_over) return;
    if (e.keyCode === 38 || e.keyCode === 87) {
      direction = "t";
      player.update(direction);
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      direction = "b";
      player.update(direction);
    } else if ((e.keyCode === 37 || e.keyCode === 65) && monster.isRemoved) {
      direction = "l";
      player.update(direction);
    } else if ((e.keyCode === 39 || e.keyCode === 68) && monster.isRemoved) {
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
        if (monster.speed < 0) monster.speed -= 2;
        else monster.speed += 2;
        console.log("Monster Hit");
      }
    }
    if (monsterHits === 3) {
      monster.remove();
      monster.isRemoved = 1;
      final.draw(CANVAS_HEIGHT - 32);
      // ctx.fillStyle = "green";
      // ctx.fillRect(CANVAS_WIDTH - 32, CANVAS_HEIGHT - 32, 32, 32);
    }
    if (player.x === final.x && player.y === final.y) {
      document.getElementById("status").style.color = "green";
      document.getElementById("status").innerText =
        "Thanks for helping billy!!";
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      clearInterval(gameLoop);
      drawFound();
      return;
    }
    if (fires === 5 && !bullet.fired && !monster.isRemoved) {
      game_over = 1;
      clearInterval(gameLoop);
      document.getElementById("status").innerText = "Game Over";
      return;
    }
  }, 20);
};
