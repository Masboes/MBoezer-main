import {SketchVector} from "../sketch-vector";
import {SketchColor} from "../sketch-color";
import {RandomType} from "./random-type";

export class Walker {
  readonly circleRadius = 5;

  private seed: number;
  constructor(private position: SketchVector, private color: SketchColor) {
    this.seed = Math.sign(Math.random()) * Math.random() * 0.5 + 0.5;
  }

  public update(randomType: RandomType, p: any) {
    switch(randomType) {
      case (RandomType.Random): {
        this.position.x = this.position.x + (Math.random() - 0.5) * 10;
        this.position.y = this.position.y + (Math.random() - 0.5) * 10;
        break;
      }
      case (RandomType.Perlin): {
        let stepLength = p.noise(this.position.x * 0.002 * this.seed, this.position.y * 0.002 * this.seed) * this.seed;
        let stepAngle = 100 * Math.PI * p.noise(this.position.x * 0.002 * this.seed, this.position.y * 0.002 * this.seed, p.frameCount * 0.001 * this.seed) * this.seed;

        this.position.x = this.position.x + Math.cos(stepAngle) * stepLength;
        this.position.y = this.position.y + Math.sin(stepAngle) * stepLength;
        break;
      }
    }
  }

  public draw(p: any) {
    p.noStroke();
    p.fill(this.color.r, this.color.g, this.color.b);
    p.ellipse(this.position.x, this.position.y, 2* this.circleRadius, 2 * this.circleRadius);
  }
}
