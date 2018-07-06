import {FormFactory} from "../form/form-factory";
import {Form} from "../form/form";
import {SketchVector} from "./sketch-vector";
import {SketchColor} from "./sketch-color";

declare let p5; // imported in scripts

export abstract class Sketch {
  public abstract sketchName: string;
  public abstract sketchTitle: string;
  public abstract sketchImage: string;
  public abstract sketchDescription: string;

  protected p5; // declare it to please typescript

  private readonly holderId: string = 'sketch-holder';

  public init(): void {
    let holder = document.querySelector('#' + this.holderId);
    this.p5 = new p5(this.sketch(holder));
  }

  public remove(): void {
    if(this.p5) {
      this.p5.remove();
    }
  }

  public saveScreenshot(): void {
    if(this.p5) {
      this.p5.saveCanvas(this.p5.canvas, this.getScreenshotFileName(), 'png');
    }
  }

  protected sketch(holder: Element): (p: any) => void {
    let me = this;
    return (p: any) => {
      p.setup = () => {
        let canvas = p.createCanvas(holder.clientWidth, holder.clientHeight);
        canvas.parent(this.holderId);
        p.canvas = canvas; // save canvas for outside usage
        me.setup(p)();

        canvas.mousePressed(this.mousePressed(p));
        canvas.mouseReleased(this.mouseReleased(p));
      };

      p.draw = () => {
        if(holder.clientWidth != p.width || holder.clientHeight != p.height) {
          p.resizeCanvas(holder.clientWidth, holder.clientHeight);
        }

        me.draw(p)();
      };

      p.mouseWheel = (event) => {
        me.mouseWheel(p)(event);
        return false;
      }
    };

  }

  // mandatory overwrite
  protected abstract setup(p: any): () => void; // called at start of sketch
  protected abstract draw(p: any): () => void; // called at each frame
  public abstract getSettingsForm(formFactory: FormFactory): Form; // generates the settings form
  public abstract updateSettings(settings: any): void; // called when settings change

  // optional overwrite
  protected mousePressed(p: any): () => void {
    return () => {};
  }
  protected mouseReleased(p: any): () => void {
    return () => {};
  }
  protected mouseWheel(p: any): (any) => void {
    return (event) => {};
  }

  // util functions
  private getScreenshotFileName(): string {
    return 'screenshot-' + (new Date().toISOString()) + '.png';
  }

  protected random2Vector(center: SketchVector, range: number): SketchVector {
    let position = {
      x: center.x + (2 * Math.random() - 1) * range,
      y: center.y + (2 * Math.random() - 1) * range,
    };
    while(((center.x - position.x)**2 + (center.y - position.y)**2)**0.5 > range) {
      position.x = center.x + (2 * Math.random() - 1) * range;
      position.y = center.y + (2 * Math.random() - 1) * range;
    }

    return position;
  }

  protected randomColor(): SketchColor {
    return {r: Math.random()*200 + 55, g: Math.random()*200 + 55, b: Math.random()*200 + 55};
  }
}
