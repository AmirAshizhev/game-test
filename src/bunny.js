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
    // this.canItMove = false;
  }

  resetPosition(app) {
    this.fallenBunny.y = 30;
    this.fallenBunny.x = randomBunnyPosition(app);
  }

  updateOfState(app) {
    if (this.needToReset){
      this.resetPosition(app);
      this.fallenBunny.y = 30;
      app.stage.removeChild(this.fallenBunny)
      this.timeOfReset = Date.now();

    } else {
      app.stage.addChild(this.fallenBunny)
      this.fallenBunny.y +=2;
    }
  }

}