import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";
import {SketchVector} from "../sketch-vector";

export class PiApproximationSketch extends Sketch {
  public sketchName: string = 'pi-approximation';
  public sketchTitle: string = 'Visual Pi approximation';
  public sketchImage: string = '/assets/images/sketches/pi-approximation-sketch.png';
  public sketchDescription: string = 'A visual way to approximate Pi.';

  private paused: boolean = false;
  private pointRadius: number = 5;
  private pointsPerDraw: number = 10;

  private radius: number;
  private origin: SketchVector = {x: 0, y: 0};

  private totalPoints: number = 0;
  private inCirclePoints: number = 0;

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()
      .addToggleField('paused', this.paused, {label: 'Pause'})
      .addSliderField('pointsPerDraw', this.pointsPerDraw, {label: 'Points per frame', min: 1, max: 20 })
      .addSliderField('pointRadius', this.pointRadius, {label: 'Point size', min: 1, max: 10 })
      .getForm();
  }

  public updateSettings(settings: any): void {
    this.paused = settings['paused'];
    this.pointRadius = settings['pointRadius'];
    this.pointsPerDraw = settings['pointsPerDraw'];
  }

  protected setup(p: any): () => void {
    return () => {
      this.radius = Math.min(p.height, p.width) / 2 * 0.8;

      p.translate(p.width / 2, p.height / 2);
      p.background(255);
      p.textSize(30);
      p.fill(0);
      p.noStroke();
      let textOffset = Math.min(p.height, p.width) / 2 * 0.90;
      p.text('ΔCircle / ΔRectangle = πr²/4r² => π ≈ 4 x ΔCircle / ΔRectangle', this.origin.x - textOffset, this.origin.y - textOffset);
    }
  }

  protected draw(p: any): () => void {
    return () => {
      p.translate(p.width / 2, p.height / 2);

      this.drawCircleRect(p);

      if(!this.paused) {
        for(let i = 0; i < this.pointsPerDraw; i++) {
          this.addPoint(p);
        }
        this.cleanOutliers(p);
      }

      this.updateApproxPi(p);
    }
  }

  private addPoint(p: any): void {
    let color = {r: 0, g: 0, b: 255};
    let point = {
      x: (Math.random() * 2 - 1) * this.radius + this.origin.x,
      y: (Math.random() * 2 - 1) * this.radius + this.origin.y,
    };
    this.totalPoints++;
    if(((point.x - this.origin.x)**2 + (point.y - this.origin.y)**2)**0.5 <= this.radius) { // if inside circle
      this.inCirclePoints++;
      color.r = 255;
      color.b = 0;
    }

    p.noStroke();
    p.fill(color.r, color.g, color.b);
    p.ellipse(point.x, point.y, this.pointRadius * 2, this.pointRadius * 2);
  }

  private updateApproxPi(p: any): void {
    let textOffset = Math.min(p.height, p.width) / 2 * 0.90;
    p.noStroke();
    p.fill(255);
    p.rect(this.origin.x - this.radius, this.origin.y + this.radius + 1, this.radius * 2, this.radius); // clear pi approx area
    p.textSize(30);
    p.fill(0);
    p.text('π ≈ ' + 4 * this.inCirclePoints / this.totalPoints, this.origin.x - this.radius, this.origin.y + textOffset);
  }

  private drawCircleRect(p: any): void {
    p.stroke(0);
    p.fill('rgba(255,255,255,0.01)');
    p.rect(this.origin.x - this.radius, this.origin.y - this.radius, this.radius * 2, this.radius * 2);
    p.noFill();
    p.ellipse(this.origin.x, this.origin.y, this.radius * 2, this.radius * 2);
  }

  private cleanOutliers(p: any): void {
    p.fill(255);
    p.rect(this.origin.x - this.radius - 10, this.origin.y - this.radius - 10, 10, this.radius * 2 + 20);
    p.rect(this.origin.x + this.radius + 1, this.origin.y - this.radius - 10, 10, this.radius * 2 + 20);
    p.rect(this.origin.x - this.radius - 10, this.origin.y - this.radius - 10, this.radius * 2 + 20, 10);
  }
}
