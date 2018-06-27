import {Sketch} from "./Sketch";

export class DemoSketch extends Sketch {
  public name: string = 'Demo Sketch';

  protected setup(p: any): () => void {
    return () => {
      console.log('setup');
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
