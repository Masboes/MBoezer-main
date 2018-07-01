import {FormFactory} from "../../../form/form-factory";
import {Form} from "../../../form/form";

declare let p5;

export abstract class Sketch {
  public abstract sketchName: string;
  public abstract sketchTitle: string;
  public abstract sketchImage: string;
  public abstract sketchDescription: string;

  private holderId: string = 'sketch-holder';

  protected p5; // declare it to please typescript

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
      };

      p.draw = () => {
        if(holder.clientWidth != p.width || holder.clientHeight != p.height) {
          p.resizeCanvas(holder.clientWidth, holder.clientHeight);
        }

        me.draw(p)();
      };

      p.mousePressed = () => {
        me.mousePressed(p)();
        return false;
      };

      p.mouseReleased = () => {
        me.mouseReleased(p)();
        return false;
      };

      p.mouseWheel = (event) => {
        me.mouseWheel(p)(event);
        return false;
      }
    };

  }

  // mandatory overwrite
  protected abstract setup(p: any): () => void;
  protected abstract draw(p: any): () => void;
  public abstract getSettingsForm(formFactory: FormFactory): Form;


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

  private getScreenshotFileName(): string {
    return 'screenshot-' + (new Date().toISOString()) + '.png';
  }
}
