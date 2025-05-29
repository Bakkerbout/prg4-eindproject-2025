import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "./resources"
import { Hurdle } from "./hurdle"

export class Runner extends Actor {

    score = 0;
    lives = 3;

    constructor() {
        super({ width: Resources.Runner.width / 2, height: Resources.Runner.height - 10 })

        const sprite = Resources.Runner.toSprite()
        this.graphics.use(sprite)
        this.z = 1
        this.pos = new Vector(500, 580);
        this.vel = new Vector(100, 0)
        this.scale = new Vector(1.2, 1.2)

    }

    onInitialize() {
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
    }

    onPreUpdate(engine, delta) {

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.body.applyLinearImpulse(new Vector(0, -350 * delta))
        }
    }

    hitSomething(event) {
        if (event.other.owner instanceof Hurdle) {
            this.score++;
            this.scene?.engine.ui.updateScore(this.score);
        }
    }
}