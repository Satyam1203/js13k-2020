class Obstacle {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.size, s);
  }
  move() {
    ctx.clearRect(this.x, this.y, this.size, s);
    ctx.fillStyle = "white";
    this.x += this.speed;
    if (this.x >= 640 - this.size) this.speed = -this.speed;
    if (this.x <= 0) this.speed = -this.speed;
    ctx.fillRect(this.x, this.y, this.size, s);
    // console.log("updated");
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
