import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources.js";
import { Runner } from "./runner.js";

export class Lifeup extends Actor {
    constructor() {
        super({
            width: Resources.Heart.width / 4,
            height: Resources.Heart.height / 4
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Heart.toSprite());
        this.body.collisionType = CollisionType.Active;

        this.pos = new Vector(1300, 600);
        this.vel = new Vector(-400, 0);

    }
}

// Leven oppakken (na 3 hurdles ofzo?) (maximaal 5 levens)