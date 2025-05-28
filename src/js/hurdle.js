import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "./resources"
import { Runner } from "./runner"

export class Hurdle extends Actor {

    constructor() {

        super({ width: 100, height: 100, collisionType: CollisionType.Active })
    }

    onInitialize(engine) {
        const sprite = Resources.Hurdle.toSprite();
        this.graphics.use(sprite);
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other.owner instanceof Runner) {
            console.log('hit enemy')
        }
    }
}