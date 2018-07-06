import {SketchVector} from "../sketch-vector";
import {SketchColor} from "../sketch-color";
import {RandomType} from "./random-type";

export class Walker {
  readonly circleRadiusMode = 3;

  private circleRadius: number;
  private seed: number;
  private previousPosition: SketchVector;

  constructor(private position: SketchVector, private color: SketchColor) {
    this.seed = (Math.random()/2 + 0.5) * 100;
    this.circleRadius = (Math.random() + 0.5) * this.circleRadiusMode;
    this.previousPosition = JSON.parse(JSON.stringify(this.position)); // copy
  }

  public update(randomType: RandomType, p: any, stepFactor: number) {
    this.previousPosition = JSON.parse(JSON.stringify(this.position)); // copy
    switch(randomType) {
      case (RandomType.Random): {
        this.position.x = this.position.x + (Math.random() - 0.5) * 10 * stepFactor;
        this.position.y = this.position.y + (Math.random() - 0.5) * 10 * stepFactor;
        break;
      }
      case (RandomType.Perlin): {
        let stepLength = stepFactor;
        let stepAngle = 4 * Math.PI * p.noise(this.seed * (p.frameCount * stepFactor + 1000) * 0.0001 + 10e6 * this.seed);

        this.position.x = this.position.x + Math.cos(stepAngle) * stepLength;
        this.position.y = this.position.y + Math.sin(stepAngle) * stepLength;
        break;
      }
    }
  }

  public draw(p: any) {
    p.stroke(this.color.r, this.color.g, this.color.b);
    p.strokeWeight(this.circleRadius);
    p.line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y);
  }
}
