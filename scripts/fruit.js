class Fruit {
  constructor() {
    this.val = 0;
    this.x = Math.floor((Math.random() * 640) / 32) * 32;
    this.y = Math.floor((Math.random() * 640) / 32) * 32;
    while (
      this.y === 96 ||
      this.y === 224 ||
      this.y === 352 ||
      this.y === 480
    ) {
      this.y = Math.floor((Math.random() * 640) / 32) * 32;
      console.log(this.y);
    }
    while (
      (this.y === 0 && this.x === 608) ||
      (this.y === 608 && this.x === 288)
    ) {
      this.x = Math.floor((Math.random() * 640) / 32) * 32;
    }
    console.log("drawn at ", this.x, this.y);
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, 32, 32);
    ctx.drawImage(food_object, this.x, this.y, 32, 32);
  }
  eaten() {
    return this.x === player.x && this.y === player.y;
  }
  displaceFood() {
    this.val = 1;
    console.log(this.val);
    this.x = -32;
    this.y = -32;
  }
}
