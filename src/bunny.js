import * as PIXI from "pixi.js";
import {randomPosition } from "./utils";

// функция рандомной х координаты для падающего кролика
function randomBunnyPosition(app) {
  return app.screen.width / 2 + randomPosition(-250, 225);
}

export class FallenBunny {
  constructor(app) {
    this.fallenBunny = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
    this.resetPosition(app);
    this.needToReset = false;
    this.resetTime = 0;
    this.canItMove = false;
  }

  resetPosition(app) {
    this.fallenBunny.y = 30;
    this.fallenBunny.x = randomBunnyPosition(app);
  }

  updateOfState(app) {
    //осановить и переместить кролика наверх, если флаг сброса в позиции true
    if (this.needsReset && Date.now() - resetTime >= 100) {
      this.resetPosition(app);
      this.needToReset = false;
      this.resetTime = 0;
      // this.canItMove = true;
    }
    if (this.fallenBunny.y >= app.screen.height) {
      this.resetPosition(app);
      this.needToReset = true;
      this.resetTime = Date.now();
      console.log(this)
    }

    this.fallenBunny.y +=1

  }
}