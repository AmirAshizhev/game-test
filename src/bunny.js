import * as PIXI from "pixi.js";

export class FallenBunny {
  constructor() {
    this.fallenBunny = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
    this.needsReset = false;
    this.resetTime = 0;
  }

  //метод обновления состояния кролика
  update(delta) {
    if (this.needsReset && Date.now() - this.resetTime >= 100) {
      // this.resetPosition();
      this.needsReset = false;
      this.resetTime = 0;
    } 
    this.fallenBunny.y += 2;
  }
}


let rabbits = [];

class Rabbit {
  constructor() {
    this.sprite = new PIXI.Sprite(rabbitTexture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);
    this.resetPosition();
    this.needsReset = false;
    this.resetTime = 0;
  }

  resetPosition() {
    this.sprite.x = Math.random() * app.renderer.width;
    this.sprite.y = -this.sprite.height;
  }

  update(delta) {
    if (this.needsReset && Date.now() - this.resetTime >= 100) {
      this.resetPosition();
      this.needsReset = false;
      this.resetTime = 0;
    }
    this.sprite.y += delta * 0.1;
  }
}

// function createRabbit() {
//   let rabbit = new Rabbit();
//   rabbits.push(rabbit);
//   app.stage.addChild(rabbit.sprite);
// }

function updateRabbits(delta) {
  let resetRabbit = null;
  for (let i = 0; i < rabbits.length; i++) {
    let rabbit = rabbits[i];
    rabbit.update(delta);
    if (rabbit.needsReset) {
      resetRabbit = rabbit;
    }
  }
  if (resetRabbit) {
    resetRabbit.needsReset = false;
    resetRabbit.resetTime = 0;
    resetRabbit.resetPosition();
  }
}

function spawnRabbits() {
  if (rabbits.length < 5 && Date.now() - lastSpawnTime >= spawnInterval) {
    createRabbit();
    lastSpawnTime = Date.now();
  }
}

function checkCollisions() {
  for (let i = 0; i < rabbits.length; i++) {
    let rabbit = rabbits[i];
    if (hitTestRectangle(player.sprite, rabbit.sprite)) {
      score++;
      rabbit.needsReset = true;
      rabbit.resetTime = Date.now();
    }
  }
}

function gameLoop(delta) {
  updateRabbits(delta);
  checkCollisions();
  spawnRabbits();
}

// app.ticker.add(gameLoop);