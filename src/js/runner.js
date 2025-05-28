import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "./resources"

export class Runner extends Actor {
    constructor() {
        super({ width: Resources.Runner.width, height: Resources.Runner.height })

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
}