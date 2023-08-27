import * as PIXI from "pixi.js";
import { hitTestRectangle, randomPosition } from "./utils";
import { FallenBunny } from './bunny';

// здесь создается экземпляр App и задаются параметы
const app = new PIXI.Application({
  background: "#1099bb",
  width: 500
});

let textStyle = new PIXI.TextStyle({
  fontSize: 36
});
let score = new PIXI.Text("Score: 0", textStyle);
let value = 0;
let lastSpawnTime =  Date.now();
let spawnInterval = 300;

// Добавляем App на страницу
document.body.appendChild(app.view);


// функция рандомной х координаты для падающего кролика
function randomBunnyPosition() {
  return app.screen.width / 2 + randomPosition(-250, 225);
}

//Функция по созданию кроликов
function createBunny() {
  // create a new Sprite(графическое изображение) from an image path
  const bunny = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
  return bunny;
}

//Создадим главного кролика
const mainBunny = createBunny();


//создадим массив падающих кроликов
const fallenBunnies = [];

//Функция для создания подающих кроликов
function cteateFallenBunny() {
  let fallenBunny = new FallenBunny();
  fallenBunnies.push(fallenBunny);
  app.stage.addChild(fallenBunny.fallenBunny);
  console.log(fallenBunnies);
}




// Сцена - контейнер, которые является корнем графа сцены, доавляем на нее кроликов и счет
app.stage.addChild(mainBunny);
app.stage.addChild(score);

// Полжение плашки Score
score.x = 15;

//движение и положение главного кролика
mainBunny.x = app.screen.width / 2;
mainBunny.y = 500;

document.addEventListener("keypress", (event) => {
  if (event.key === "a" || event.key === "ф" || event.key ==="A" || event.key ==="Ф") {
    if (mainBunny.x > 25) {
      mainBunny.x -= 30;
    } else {
      mainBunny.x = 0;
    }
  } else if (event.key === "d" || event.key === "в" || event.key ==="D" || event.key ==="В") {
    if (mainBunny.x < app.screen.width - 50) {
      mainBunny.x += 30;
    } else {
      mainBunny.x = app.screen.width - 25;
    }
  }
});

function updateRabbits(delta) {
  let resetRabbit = null;
  for (let i = 0; i < fallenBunnies.length; i++) {
    let rabbit = fallenBunnies[i];
    // rabbit.fallenBunny.x = randomBunnyPosition();
    // rabbit.y = 30;
    // rabbit.x = randomBunnyPosition();
    rabbit.update();
    
    if (rabbit.needsReset) {
      resetRabbit = rabbit;
    }
    if (rabbit.y >= app.screen.height) {
      rabbit.needsReset = true;
      rabbit.resetTime = Date.now();
    }
  }
  if (resetRabbit) {
    resetRabbit.needsReset = false;
    resetRabbit.resetTime = 0;
    resetRabbit.fallenBunny.y = randomBunnyPosition();
  }
}

function spawnRabbits() {
  if (fallenBunnies.length < 5 && Date.now() - lastSpawnTime >= spawnInterval) {
    cteateFallenBunny();
    lastSpawnTime = Date.now();
  }
}


// Listen for animate update
app.ticker.add((delta) => {

  updateRabbits(delta)
  // здесь используется функция коллизий, она нужна чтобы запечатлеть момент соприкосновения и увеличить значение score
  for (let i = 0; i < fallenBunnies.length; i++) {
    // fallenBunnies[i].y += 2;
    let rabbit = fallenBunnies[i].fallenBunny;
    // проверка соприкосновения с любым из кроликов
    if (hitTestRectangle(rabbit, mainBunny)) {

      value++;
      score.text = `Score: ${value}`;
      rabbit.needsReset = true;
      rabbit.resetTime = Date.now();
      rabbit.y = 30;
      rabbit.x = randomBunnyPosition();

      // updateRabbits(delta)
    } else if (fallenBunnies[i].fallenBunny.y === app.screen.height) {
      rabbit.y = 30;
      rabbit.x = randomBunnyPosition();
    }
  }

  spawnRabbits()
});

//Создаем певого падающего кролика
cteateFallenBunny()