import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";
import {Walker} from "./walker";
import {SketchVector} from "../solar-system/sketch-vector";

export class WalkerSketch extends Sketch {
  public sketchName: string = 'walker';
  public sketchTitle: string = 'Walkers';
  public sketchImage: string = '/assets/images/sketches/walker-sketch.png';
  public sketchDescription: string = 'Several kinds of walking simulations';

  private walkers: Walker[];

  private walkerCount = 100;

  // moving and zooming related
  private dragging: boolean = false;
  private origin: SketchVector;
  private offset: SketchVector;
  private zoomLevel: number;

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()
      .getForm();
  }

  public updateSettings(settings: any): void {

  }

  protected setup(p: any): () => void {
    return () => {
      this.origin = {x: 0, y: 0};
      this.offset = {x: 0, y: 0};
      this.dragging = false;
      this.zoomLevel = 1.0;

      this.walkers = [];
      for(let i = 0; i < this.walkerCount; i++) {
        this.walkers.push(new Walker({x: 0, y: 0}, {r: 255, g: 0, b: 0}));
      }
    }
  }

  protected draw(p: any): () => void {
    return () => {
      p.background('rgba(255, 255, 255, 0.2)');

      if (this.dragging) {
        this.origin = {
          x: p.mouseX/this.zoomLevel + this.offset.x,
          y: p.mouseY/this.zoomLevel + this.offset.y,
        };
      }
      p.translate(p.width/2, p.height/2);
      p.scale(this.zoomLevel);
      p.translate(this.origin.x, this.origin.y);


      for(let walker of this.walkers) {
        walker.update();
        walker.draw(p);
      }
    }
  }

  protected mouseReleased(p: any): () => void {
    return () => {
      this.dragging = false;
    }
  }

  protected mousePressed(p: any): () => void {
    return () => {
      this.dragging = true;
      this.offset = {x: this.origin.x - p.mouseX/this.zoomLevel, y: this.origin.y - p.mouseY/this.zoomLevel};
    }
  }

  protected mouseWheel(p: any): (any) => void {
    return (event) => {
      this.zoomLevel -= 0.005 * event.delta;
      this.zoomLevel = Math.max(0, this.zoomLevel);
      return false;
    }
  }
}
