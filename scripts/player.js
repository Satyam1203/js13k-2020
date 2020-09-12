class Player {
    constructor(size) {
      this.size = size;
      this.x = CANVAS_WIDTH / 2 - this.size;
      this.y = CANVAS_HEIGHT - this.size;
      ctx.fillStyle = "black";
      console.log("Player");
      console.log(this.x, this.y);
      ctx.drawImage(player_object, this.x, this.y, this.size, this.size);
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
      ctx.drawImage(player_object, this.x, this.y, this.size, this.size);
    }
    destination() {
      return this.x === final.x && this.y === final.y;
    }
  }
  