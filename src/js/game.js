import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, RepeatForever, Axis, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background.js'
import { Runner } from './runner.js'
import { Platform } from './platform.js'
// import { Hurdle } from './hurdle.js'

export class Game extends Engine {

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

        const runner = new Runner()
        this.add(runner)
        this.currentScene.camera.strategy.lockToActorAxis(runner, Axis.X)
    }
}

new Game()
