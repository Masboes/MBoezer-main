import {Sketch} from "./sketch";

export class DemoSketch extends Sketch {
  public static sketchName: string = 'demo-sketch';
  public static sketchTitle: string = 'Demo Sketch';

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
