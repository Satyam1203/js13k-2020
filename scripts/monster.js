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
