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

        const highscore = localStorage.getItem("highscore") || 0;
        this.highscoreLabel = new Label({
            text: `Highscore: ${highscore}`,
            pos: new Vector(0, 80),
            font: new Font({ size: 32, color: Color.Black })
        });
        this.addChild(this.highscoreLabel);
    }

    updateScore(score) {
        this.scoreLabel.text = `Score: ${score}`;
        const highscore = Number(localStorage.getItem("highscore")) || 0;
        if (score > highscore) {
            localStorage.setItem("highscore", score);
            this.highscoreLabel.text = `Highscore: ${score}`;
        }
    }

    updateLives(lives) {
        this.livesLabel.text = `Lives: ${lives}`;
    }
}