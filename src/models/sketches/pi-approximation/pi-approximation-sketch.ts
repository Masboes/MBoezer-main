import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";

export class PiApproximationSketch extends Sketch {
  public sketchName: string = 'pi-approximation';
  public sketchTitle: string = 'Visual Pi approximation';
  public sketchImage: string = '/assets/images/sketches/pi-approximation-sketch.png';
  public sketchDescription: string = 'A visual way to approximate Pi.';

  private paused: boolean = false;

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

    }
  }
}
