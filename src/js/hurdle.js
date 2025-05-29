import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "./resources"
import { Runner } from "./runner"

export class Hurdle extends Actor {

    constructor() {
        super({
            width: Resources.Hurdle.width / 4, height: Resources.Hurdle.height - 100, anchor: new Vector(0.5, 0.5)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Hurdle.toSprite());
        this.body.collisionType = CollisionType.Active;
        this.scale = new Vector(0.5, 0.5);
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other.owner instanceof Runner) {
            const runner = event.other.owner;
            if (runner.lives > 1) {
                runner.lives -= 1;
                runner.scene?.engine.ui.updateLives(runner.lives);

                let flashes = 6;
                let flashInterval = setInterval(() => {
                    runner.graphics.opacity = runner.graphics.opacity === 1 ? 0.2 : 1;
                    flashes--;
                    if (flashes <= 0) {
                        clearInterval(flashInterval);
                        runner.graphics.opacity = 1;
                    }
                }, 100);

                this.kill();
                runner.vel = new Vector(100, runner.vel.y);

            } else {
                runner.lives = 0;
                runner.scene?.engine.ui.updateLives(runner.lives);
                runner.kill();
            }

            // Min 1 leven wanneer tegen hurdle aan loopt
            // if de levens op zijn en runner loopt tegen hurdle ga dood
            // Een animatie wanneer runner tegen hurdle loopt
            // Levens oppakken, op random momenten verschijnen

            // Niet double jumpen
            // Maximaal 5 levens?
            // Levens afbeelding bovenaan zetten (tekst voor nu)
        }
    }
}