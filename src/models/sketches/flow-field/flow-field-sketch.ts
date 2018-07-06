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

      }
    }
  }
}
