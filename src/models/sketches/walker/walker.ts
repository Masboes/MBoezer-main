import {SketchVector} from "../sketch-vector";
import {SketchColor} from "../sketch-color";

export class Walker {
  readonly circleRadius = 5;

  constructor(private position, private color) {}

  public update() {
    this.position.x = this.position.x + (Math.random() - 0.5) * 10;
    this.position.y = this.position.y + (Math.random() - 0.5) * 10;
  }

  public draw(p: any) {
    p.noStroke();
    p.fill(this.color.r, this.color.g, this.color.b);
    p.ellipse(this.position.x, this.position.y, 2* this.circleRadius, 2 * this.circleRadius);
  }
}
