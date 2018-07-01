import {Sketch} from "./sketch";
import {FormFactory} from "../../../form/form-factory";
import {Form} from "../../../form/form";

export class DemoSketch extends Sketch {
  public sketchName: string = 'demo-sketch';
  public sketchTitle: string = 'Demo Sketch';
  public sketchImage: string = '/assets/images/sketches/demo-sketch.png';
  public sketchDescription: string = 'Demo sketch to test the system.';

  protected setup(p: any): () => void {
    return () => {

    }
  }

  protected draw(p: any): () => void {
    return () => {
      if (p.mouseIsPressed) {
        p.fill(0);
      } else {
        p.fill(255);
      }
      p.ellipse(p.mouseX, p.mouseY, 80, 80);
    }
  }

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()
      .getForm();
  }

  public updateSettings(settings: any): void {

  }
}
