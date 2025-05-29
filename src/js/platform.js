import { Actor, CollisionType, Color, Rectangle } from "excalibur";

export class Platform extends Actor {
    constructor(y = 600, x = 1280 / 2) {
        super({
            x: x,
            y: y,
            width: 1280,
            height: 50,
        });
    }

    onInitialize(engine) {
        this.body.useGravity = false;
        this.body.collisionType = CollisionType.Fixed;
    }

    onPreUpdate(engine, delta) {
        this.pos.x = engine.currentScene.camera.x;
    }
}