import { ScreenElement, Label, Font, Color, Vector } from "excalibur";

export class UI extends ScreenElement {
    constructor() {
        super({ x: 30, y: 30 });
        this.scoreLabel = new Label({
            text: "Score: 0",
            pos: new Vector(0, 0),
            font: new Font({ size: 32, color: Color.Black })
        });
        this.addChild(this.scoreLabel);

        this.livesLabel = new Label({
            text: "Lives: 3",
            pos: new Vector(0, 40),
            font: new Font({ size: 32, color: Color.Black })

        });
        this.addChild(this.livesLabel);
    }

    updateScore(score) {
        this.scoreLabel.text = `Score: ${score}`;
    }

    updateLives(lives) {
        this.livesLabel.text = `Lives: ${lives}`;
    }
}