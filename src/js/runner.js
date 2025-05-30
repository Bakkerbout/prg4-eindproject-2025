import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "./resources"
import { Hurdle } from "./hurdle"
import { Platform } from "./platform";

export class Runner extends Actor {

    #score = 0;
    lives = 3;


    constructor() {
        super({ width: Resources.Runner.width / 2, height: Resources.Runner.height - 10 })

        const sprite = Resources.Runner.toSprite()
        this.graphics.use(sprite)
        this.z = 1
        this.pos = new Vector(500, 575 - this.height / 2);

        this.vel = new Vector(100, 0)
        this.scale = new Vector(1.2, 1.2)
    }

    onInitialize() {
        this.body.useGravity = true;
        this.body.collisionType = CollisionType.Active;
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.W) && this.isOnGround) {
            this.body.applyLinearImpulse(new Vector(0, -350 * delta));
            this.isOnGround = false;
        }

        if (engine.input.keyboard.isHeld(Keys.S)) {
            this.scale = new Vector(1.2, 0.6);
        } else {
            this.scale = new Vector(1.2, 1.2);
        }
    }

    hitSomething(event) {
        if (event.other.owner instanceof Hurdle) {
            this.#score++;
            this.scene?.engine.ui.updateScore(this.#score);
        }
    }

    onPostUpdate() {
        const platformTop = 575;
        const margin = 5;
        const runnerBottom = this.pos.y + this.height / 2;

        if (Math.abs(runnerBottom - platformTop) <= margin) {
            this.isOnGround = true;
        } else {
            this.isOnGround = false;
        }
    }
}