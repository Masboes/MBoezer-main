import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";
import {GravitationalBody} from "./gravitational-body";
import {SketchVector} from "./sketch-vector";

export class SolarSystemSketch extends Sketch {
  public sketchName: string = 'solar-system-sketch';
  public sketchTitle: string = 'Solar System Sketch';
  public sketchImage: string = '/assets/images/sketches/solar-system-sketch.jpg';
  public sketchDescription: string = 'Simulation of gravitational bodies';

  private bodies: GravitationalBody[];
  private deltaTime = 0.01; // goal frametime, often lower due to processing time

  // variables that are changed by settings
  private accelerationFactor = 5e5;
  private pause: boolean = false;
  private startBodies: number = 1000;

  // moving and zooming related
  private dragging: boolean = false;
  private origin: SketchVector;
  private offset: SketchVector;
  private zoomLevel: number;

  protected setup(p: any): () => void {
    return () => {
      this.origin = {x: 0, y: 0};
      this.offset = {x: 0, y: 0};
      this.dragging = false;
      this.pause = false;
      this.zoomLevel = 1.0;

      this.bodies = [];
      for(let i = 0; i < this.startBodies; i++) {
        let position = this.randomVector(this.origin, Math.min(p.width, p.height) / 2);
        let velocity = this.randomVector({x: 0, y: 0}, 0.0010);
        let color = {r: Math.random()*200 + 55, g: Math.random()*200 + 55, b: Math.random()*200 + 55};
        let randomMass = Math.random() * 20;
        this.bodies.push(new GravitationalBody(randomMass, color, position, velocity));
      }

      p.frameRate(1 / this.deltaTime);
    }
  }

  protected draw(p: any): () => void {
    return () => {
      p.background('rgba(0, 0, 0, 0.5)');

      if (this.dragging) {
        this.origin = {
          x: p.mouseX/this.zoomLevel + this.offset.x,
          y: p.mouseY/this.zoomLevel + this.offset.y,
        };
      }
      p.translate(p.width/2, p.height/2);
      p.scale(this.zoomLevel);
      p.translate(this.origin.x, this.origin.y);

      for(let i = 0; i < this.bodies.length; i++) {
        let body = this.bodies[i];
        if(body && body.active){
          if(!this.pause){
            body.calculateForces(i, this.bodies);
            body.applyPhysics(this.deltaTime * this.accelerationFactor);
          }
          body.draw(p);
        }
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

  private randomVector(center: SketchVector, range: number): SketchVector {
    let position = {
      x: center.x + (2 * Math.random() - 1) * range,
      y: center.y + (2 * Math.random() - 1) * range,
    };
    while(((center.x - position.x)**2 + (center.y - position.y)**2)**0.5 > range) {
      position.x = center.x + (2 * Math.random() - 1) * range;
      position.y = center.y + (2 * Math.random() - 1) * range;
    }

    return position;
  }

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()
      .addToggleField('pause', false, {label: 'Pause'})
      .addSliderField('accelerationFactor', 50, {label: 'Acceleration factor', min: 1, max: 100 })
      .addSliderField('startBodies', 10, {label: 'Number of bodies', min: 1, max: 20 })
      .getForm();
  }

  public updateSettings(settings: any): void {
    this.accelerationFactor = +settings['accelerationFactor'] * 1e4;
    this.pause = settings['pause'];
    this.startBodies = settings['startBodies'] * 1e2;
  }

}
