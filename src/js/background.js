import { Actor, CollisionType, DegreeOfFreedom, Vector } from "excalibur";
import { Resources } from "./resources.js";
import { Hurdle } from "./hurdle.js";

export class Background extends Actor {
    constructor() {
        super();
        this.speed = 125;
    }
    onInitialize(engine) {
        this.anchor = Vector.Half;
        const sprite = Resources.Background.toSprite();
        sprite.width = engine.drawWidth;
        sprite.height = engine.drawHeight;
        this.graphics.use(sprite);

        this.body.collisionType = CollisionType.Fixed

        this.events.on("exitviewport", () => {
            this.pos.x = this.pos.x + 2 * engine.drawWidth;

            const minX = this.pos.x - engine.drawWidth / 2 + 100;
            const maxX = this.pos.x + engine.drawWidth / 2 - 100;

            // for (let i = 0; i < 3; i++) {
            // const randomX = Math.random() * (maxX - minX) + minX;
            // const hurdle = new Hurdle();
            // hurdle.pos = new Vector(500, 580);
            // hurdle.scale = new Vector(0.5, 0.5)
            // engine.add(hurdle);
            // }
        });
    }

    // addHurdle(e) {
    //     const sprite = Resources.Hurdle.toSprite();
    // }
}
