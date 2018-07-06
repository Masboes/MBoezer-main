import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";
import {SketchColor} from "../sketch-color";

export class FlowFieldSketch extends Sketch {
  public sketchName: string = 'flow-field';
  public sketchTitle: string = 'Perlin Flow Fields';
  public sketchImage: string = '/assets/images/sketches/flow-field-sketch.png';
  public sketchDescription: string = 'Perlin noise generated flow fields.';

  // editable by settings
  private paused = false;

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()
      .addToggleField('paused', this.paused, {label: 'Pause'})
      .getForm();
  }

  public updateSettings(settings: any): void {
    this.paused = settings['paused'];
  }

  protected setup(p: any): () => void {
    return () => {

    }
  }

  protected draw(p: any): () => void {
    return () => {
      if(!this.paused){
        p.background(0);
        p.stroke(255);
        let step = 0.05;
        let blocksize = 10;
        let rows = Math.ceil(p.width / blocksize);
        let cols = Math.ceil(p.height / blocksize);

        for(let i = 0; i < rows; i++) {
          for(let j = 0; j < cols; j++) {
            let angle = p.noise(i * step, j * step, p.frameCount * step * 0.5) * 2 * Math.PI;
            p.line(i * blocksize, j * blocksize, i * blocksize + Math.cos(angle) * blocksize * 2, j * blocksize + Math.sin(angle) * blocksize * 2);
          }
        }
      }
    }
  }
}
