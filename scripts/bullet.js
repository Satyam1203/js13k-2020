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
