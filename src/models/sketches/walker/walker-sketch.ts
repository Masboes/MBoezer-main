import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";
import {Walker} from "./walker";
import {SketchVector} from "../sketch-vector";
import {RandomType} from "./random-type";

export class WalkerSketch extends Sketch {
  public sketchName: string = 'walker';
  public sketchTitle: string = 'Walkers';
  public sketchImage: string = '/assets/images/sketches/walker-sketch.png';
  public sketchDescription: string = 'Several kinds of walking simulations';

  private walkers: Walker[];

  // editable by settings
  private paused = false;
  private walkerCount = 500;
  private randomType: RandomType = RandomType.Perlin;
  private stepFactor = 1.0;

  // moving and zooming related
  private dragging: boolean = false;
  private origin: SketchVector;
  private offset: SketchVector;
  private zoomLevel: number;

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()
      .addToggleField('paused', this.paused, {label: 'Pause'})
      .addSliderField('walkerCount', this.walkerCount / 100, {label: 'Number of walkers', min: 1, max: 50})
      .addSliderField('stepFactor', this.stepFactor * 10, {label: 'Speed', min: 1, max: 20})
      .addChoiceField(
        'randomType',
        this.randomType,
        {
          label: 'Walker type',
          expanded: true,
          choices: {
            "Perlin": "Perlin Noise",
            "Random": "Brownian Motion",
          }
        }
        )
      .getForm();
  }

  public updateSettings(settings: any): void {
    this.paused = settings['paused'];
    this.walkerCount = settings['walkerCount'] * 100;
    this.randomType = settings['randomType'];
    this.stepFactor = settings['stepFactor'] / 10;
  }

  protected setup(p: any): () => void {
    return () => {
      this.origin = {x: 0, y: 0};
      this.offset = {x: 0, y: 0};
      this.dragging = false;
      this.zoomLevel = 1.0;

      this.walkers = [];
      for(let i = 0; i < this.walkerCount; i++) {
        this.walkers.push(new Walker({x: 0, y:0}, this.randomColor()));
      }
    }
  }

  protected draw(p: any): () => void {
    return () => {
      p.background('rgba(255, 255, 255, ' + this.stepFactor / 10 + ')');

      if (this.dragging) {
        this.origin = {
          x: p.mouseX/this.zoomLevel + this.offset.x,
          y: p.mouseY/this.zoomLevel + this.offset.y,
        };
        p.background('rgba(255, 255, 255, 1.0)');
      }
      p.translate(p.width/2, p.height/2);
      p.scale(this.zoomLevel);
      p.translate(this.origin.x, this.origin.y);


      for(let walker of this.walkers) {
        if(!this.paused) {
          walker.update(this.randomType, p, this.stepFactor);
        }

        walker.draw(p);
      }
    }
  }

  protected mouseReleased(p: any): () => void {
    return () => {
      this.dragging = false;
      p.draw();
      p.draw();
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
      p.background('rgba(255, 255, 255, 1.0)');
      p.draw();
      p.draw();
      return false;
    }
  }
}
