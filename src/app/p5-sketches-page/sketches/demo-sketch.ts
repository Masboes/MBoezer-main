import {Sketch} from "./sketch";

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
}
