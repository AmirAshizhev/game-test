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
let lastSpawnTime = Date.now();
let spawnInterval = 300;

// Добавляем App на страницу
document.body.appendChild(app.view);



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
  let fallenBunny = new FallenBunny(app);
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

//функция, которая отвечает за обновление кроликов
function updateRabbits() {

  for ( let i = 0; i<fallenBunnies.length; i++ ){
    let rabbit = fallenBunnies[i];
    rabbit.updateOfState(app)

    if (rabbit.fallenBunny.y >= app.screen.height) {
      rabbit.needToReset = true // достигший дна кролик улетает наверх и не двигается
    }

    // проверка, чтобы опустить флаг сброса
    if (rabbit.needToReset && Date.now() - lastSpawnTime >=spawnInterval ) {
      rabbit.needToReset = false;
      lastSpawnTime = Date.now();
    }
    // по идее, теперь мне не нужно в колиизии что-то менять, кроме флага т.к updateBunnies () сама проверяет, 
    //можно ли выпускать следующего кролика
  }
}

//функция спауна новых кроликов 
function spawnRabbits() {

  if(fallenBunnies.length < 5){
    let bunny = new FallenBunny(app);
    fallenBunnies.push(bunny);
    bunny.needToReset = true; // мы ставим новосозданному кролику флаг, что он должен быть наверху и что он дожен должен ждать (а нужна ли эта строка? )
    app.stage.addChild(bunny.fallenBunny);
  }
  
  }

//функция обработки коллизий
function collisions () {
  for (let i = 0; i < fallenBunnies.length; i++) {
    // fallenBunnies[i].y += 2;
    let rabbit = fallenBunnies[i];
    // проверка соприкосновения с любым из кроликов
    if (hitTestRectangle(rabbit.fallenBunny, mainBunny)) {

      value++;
      score.text = `Score: ${value}`;

      rabbit.needToReset = true;
      app.stage.removeChild(rabbit.fallenBunny);
      spawnRabbits()
    } 
  }
}




// Listen for animate update
app.ticker.add((delta) => {
  updateRabbits()
  collisions ()
});

//Создаем певого падающего кролика
cteateFallenBunny()