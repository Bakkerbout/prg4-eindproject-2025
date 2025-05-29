import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources.js";
import { Runner } from "./runner.js";

export class Lifeup extends Actor {
    constructor() {
        super({
            width: Resources.Heart.width / 4,
            height: Resources.Heart.height / 4,
            anchor: new Vector(0.5, 0.5)

        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Heart.toSprite());
        this.body.collisionType = CollisionType.Active;
        this.scale = new Vector(0.04, 0.04);
        this.body.useGravity = false;

        this.on('collisionstart', (event) => {
            if (event.other.owner instanceof Runner) {
                const runner = event.other.owner;
                runner.lives += 1;
                runner.scene?.engine.ui.updateLives(runner.lives);
                this.kill();
                runner.vel = new Vector(100, runner.vel.y);
            }
        });
    }
}