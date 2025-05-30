import { Actor, CollisionType, DegreeOfFreedom, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Background extends Actor {
    constructor() {
        super();
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
        });
    }
    onPreUpdate(engine, delta) {
        const runner = engine.getRunner && engine.getRunner();
        if (runner && !runner.isKilled && !runner.isKilled()) {
            // Gebruik altijd engine.speed, NIET een eigen this.speed!
            this.pos.x -= engine.speed * (delta / 1000);
        }
    }
}
