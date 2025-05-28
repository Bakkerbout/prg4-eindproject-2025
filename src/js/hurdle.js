import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "./resources"
import { Runner } from "./runner"

export class Hurdle extends Actor {

    constructor() {

        super({ width: 100, height: 100 })
    }

    onInitialize(engine) {
        // const sprite = Resources.Hurdle.toSprite();
        this.graphics.use(Resources.Hurdle.toSprite());
        this.body.collisionType = CollisionType.Active;
        // const hurdle = new Hurdle();
        this.pos = new Vector(1300, 580);
        this.vel = new Vector(-400, 0);

        this.scale = new Vector(0.5, 0.5);
        // engine.add(hurdle);

        this.on('collisionstart', (event) => this.hitSomething(event));

    }

    hitSomething(event) {
        if (event.other.owner instanceof Runner) {
            console.log('hit enemy')
        }
    }
}