import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, RepeatForever, Axis, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background.js'
import { Runner } from './runner.js'
import { Platform } from './platform.js'
import { Hurdle } from './hurdle.js'
import { UI } from './ui.js'
import { Lifeup } from './life-up.js'
import { Bal } from './bal.js'

export class Game extends Engine {

    #runner;
    #score = 0;
    ui;
    speed = 200;
    speedIncrease = 100;


    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 800),
            }
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        const background = new Background();
        background.pos = new Vector(0, this.drawHeight / 2);

        this.add(background)

        const background2 = new Background();
        background2.pos = new Vector(this.drawWidth * -1, this.drawHeight / 2);

        this.add(background2)

        this.add(new Platform(600));

        this.#runner = new Runner()
        this.add(this.#runner)
        this.currentScene.camera.strategy.lockToActorAxis(this.#runner, Axis.X)

        this.startSpawner();

        this.startScoreCounter();

        this.ui = new UI();
        this.add(this.ui);
    }

    startSpawner() {
        const spawn = () => {
            if (this.#runner && !this.#runner.isKilled()) {
                const cameraX = this.currentScene.camera.x;
                const screenRight = cameraX + this.drawWidth / 2;

                const spawnType = Math.random() < 0.5 ? "hurdle" : "bal";

                if (spawnType === "bal") {
                    const newBal = new Bal();
                    newBal.pos = new Vector(screenRight - 50, 200 + Math.random() * 150);
                    const scale = 0.2 + Math.random() * 0.4;
                    newBal.scale = new Vector(scale, scale);
                    newBal.vel = new Vector(-this.speed, 0);
                    this.add(newBal);
                } else {
                    const newHurdle = new Hurdle();
                    newHurdle.pos = new Vector(screenRight - 50, 580);
                    newHurdle.vel = new Vector(-this.speed, 0);
                    this.add(newHurdle);

                    if (Math.random() < 0.3) {
                        const heart = new Lifeup();
                        heart.pos = new Vector(0, -newHurdle.height / 2 - heart.height / 2 - 4);
                        newHurdle.addChild(heart);
                    }
                }
            }
            setTimeout(spawn, 2000 + Math.random() * 3000);
        };
        spawn();
    }

    startScoreCounter() {
        setInterval(() => {
            if (this.#runner && !this.#runner.isKilled()) {
                this.#score += 1;
                this.ui.updateScore(this.#score);

                if (this.#score % 10 === 0) {
                    this.speed += this.speedIncrease;
                }
            }
        }, 1000);
    }

    getRunner() {
        return this.#runner;
    }
}

new Game()
