import * as PIXI from "pixi.js";
import { hitTestRectangle, randomPosition } from "./utils";

// здесь создается экземпляр App и задаются параметы
const app = new PIXI.Application({
  background: "#1099bb",
  // resizeTo: window
  width: 500
});

let textStyle = new PIXI.TextStyle({
  fontSize: 36
});
let score = new PIXI.Text("Score: 0", textStyle);
let value = 0;

// функция рандомной х координаты для падающего кролика
function randomBunnyPosition() {
  return app.screen.width / 2 + randomPosition(-250, 225);
}

// Добавляем App на страницу
document.body.appendChild(app.view);

//Функция по созданию кроликов
function createBunny() {
  // create a new Sprite(графическое изображение) from an image path
  const bunny = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
  return bunny;
}

//Создадим двух зайцев
const mainBunny = createBunny();
const fallenBunny = createBunny();

//создадим массив падающих кроликов
const fallenBunnies = [];
fallenBunnies[0] = fallenBunny;
console.log(fallenBunnies)

// Сцена - контейнер, которые является корнем графа сцены, доавляем на нее зайцев и счет
app.stage.addChild(mainBunny);
app.stage.addChild(fallenBunnies[0]);
app.stage.addChild(score);

// Полжение плашки Score
score.x = 15;

//движение и положение главного кролика
mainBunny.x = app.screen.width / 2;
mainBunny.y = 500;

document.addEventListener("keypress", (event) => {
  if (event.key === "a" || event.key === "ф") {
    if (mainBunny.x > 25) {
      mainBunny.x -= 30;
    } else {
      mainBunny.x = 0;
    }
  } else if (event.key === "d" || event.key === "в") {
    if (mainBunny.x < app.screen.width - 50) {
      mainBunny.x += 30;
    } else {
      mainBunny.x = app.screen.width - 25;
    }
  }
});

// начальное движение и положение падающего кролика
// fallenBunny.y = 30;
// fallenBunny.x = randomBunnyPosition();
// Коллизия

// Listen for animate update
app.ticker.add((delta) => {
  //скорость падения
  
  // здесь используется функция коллизий, она нужна чтобы запечатлеть момент соприкосновения и увеличить значение scor

  for (let i = 0; i < fallenBunnies.length; i++) {
    // fallenBunnies[fallenBunnies.length] = createBunny();
    app.stage.addChild(fallenBunnies[i])
    fallenBunnies[i].y += 2;
    

    //проверка соприкосновения с любым из кроликов
    if (hitTestRectangle(fallenBunnies[i], mainBunny)) {
      fallenBunnies[i].y = 30;
      fallenBunnies[i].x = randomBunnyPosition();
      value++;
      score.text = `Score: ${value}`;

      // ограничение количества кроликов
      // if (fallenBunnies.length > 4) return;


      //добавление кроликов с задержкой после коллизии
      setTimeout(() => {
        if (fallenBunnies.length > 4) return;
        fallenBunnies[fallenBunnies.length] = createBunny();

        console.log(fallenBunnies);
      }, i*1000)
 

  


    } else if (fallenBunnies[i].y === app.screen.height) {
      fallenBunnies[i].y = 30;
      fallenBunnies[i].x = randomBunnyPosition();
    }
  }
  // if (hitTestRectangle(fallenBunny, mainBunny)) {
  //   fallenBunny.y = 30;
  //   fallenBunny.x = randomBunnyPosition();

  //   value++;
  //   score.text = `Score: ${value}`;
  // } else if (fallenBunny.y === app.screen.height) {
  //   fallenBunny.y = 30;
  //   fallenBunny.x = randomBunnyPosition();
  // }
});
