import {Sketch} from "./sketch";
import {del} from "selenium-webdriver/http";
import {FormFactory} from "../../../form/form-factory";
import {Form} from "../../../form/form";

export class SolarSystemSketch extends Sketch {
  public sketchName: string = 'solar-system-sketch';
  public sketchTitle: string = 'Solar System Sketch';
  public sketchImage: string = '/assets/images/sketches/solar-system-sketch.jpg';
  public sketchDescription: string = 'Simulation of gravitational bodies';

  private bodies: GravitationalBody[];
  private deltaTime = 0.01;
  private accelerationFactor = 500000;

  private dragging: boolean = false;
  private origin: Vector;
  private offset: Vector;
  private zoomLevel: number;

  protected setup(p: any): () => void {
    return () => {
      this.origin = {x: 0, y: 0};
      this.offset = {x: 0, y: 0};
      this.dragging = false;
      this.zoomLevel = 1.0;

      this.bodies = [];
      for(let i = 0; i < 1000; i++) {
        let position = this.randomVector(this.origin, Math.min(p.width, p.height) / 2);
        let velocity = this.randomVector({x: 0, y: 0}, 0.0005);
        let color = {r: Math.random()*255, g: Math.random()*255, b: Math.random()*255};
        let randomMass = Math.random() * 10;
        this.bodies.push(new GravitationalBody(randomMass, color, position, velocity));
      }

      p.frameRate(1 / this.deltaTime);
    }
  }

  protected draw(p: any): () => void {
    return () => {
      p.background(235);

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
          body.update(this.bodies, this.deltaTime * this.accelerationFactor);
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
      return false;
    }
  }

  private randomVector(center: Vector, range: number): Vector {
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

  protected getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()
      .addToggleField('test', false, {label: 'test-toggle'})
      .getForm();
  }
}

class GravitationalBody {
  readonly bigG = 6.67408e-11; // 'big' 'e-11'

  public mass: number;
  public position: Vector;
  public velocity: Vector;
  public color: Color;
  public active: boolean = true; // false if it has been absorbed

  constructor(mass: number, color: Color, position: Vector, velocity: Vector = {x:0, y:0}) {
    this.mass = mass;
    this.color = color;
    this.position = position;
    this.velocity = velocity;
  }

  public update(bodies: GravitationalBody[], deltaTime: number): void {
    let forceSumX = 0;
    let forceSumY = 0;

    for(let body of bodies) {
      if(body != this && body.active){
        let force = this.calculateForce(this, body);
        forceSumX += force.x;
        forceSumY += force.y;
      }
    }

    let acceleration = this.calculateAcceleration({x: forceSumX, y: forceSumY});
    this.applyAcceleration(acceleration, deltaTime);
    this.applyVelocity(deltaTime);

    for(let body of bodies) {
      if(this.checkCollision(this, body) && body.active && body != this) {
        this.absorb(body);
      }
    }
  }

  public draw(p: any): void {
    p.stroke(this.color.r, this.color.g, this.color.b);
    p.fill(this.color.r, this.color.g, this.color.b);

    p.ellipse(this.position.x, this.position.y, this.radius() * 2, this.radius() * 2);
  }

  private calculateForce(body1: GravitationalBody, body2: GravitationalBody): Vector {
    let range = this.distance(body1.position, body2.position);
    let force = -1 * this.bigG * (body1.mass * body2.mass) / range;
    return {
      x: force * (body1.position.x - body2.position.x) / range,
      y: force * (body1.position.y - body2.position.y) / range,
    };
  }

  private applyAcceleration(acceleration: Vector, deltaTime: number): void {
    this.velocity = {
      x: this.velocity.x + acceleration.x * deltaTime,
      y: this.velocity.y + acceleration.y * deltaTime
    };
  }

  private applyVelocity(deltaTime: number): void {
    this.position = {
      x: this.position.x + this.velocity.x * deltaTime,
      y: this.position.y + this.velocity.y * deltaTime
    }
  }

  private calculateAcceleration(force: Vector): Vector {
    return {
      x: force.x / this.mass, // F = m * a => a = F / m
      y: force.y / this.mass,
    }
  }

  private distance(vector1: Vector, vector2: Vector): number {
    return ((vector1.x - vector2.x)**2 + (vector1.y - vector2.y)**2)**0.5;
  }

  private checkCollision(body1: GravitationalBody, body2: GravitationalBody): boolean {
    return this.distance(body1.position, body2.position) <= body1.radius() + body2.radius();
  }

  private absorb(body: GravitationalBody) {
    body.active = false;
    this.position = {
      x: (this.mass * this.position.x + body.mass * body.position.x) / (this.mass + body.mass),
      y: (this.mass * this.position.y + body.mass * body.position.y) / (this.mass + body.mass),
    };

    this.velocity = {
      x: (this.mass * this.velocity.x + body.mass * body.velocity.x) / (this.mass + body.mass),
      y: (this.mass * this.velocity.y + body.mass * body.velocity.y) / (this.mass + body.mass),
    };

    this.color = {
      r: (this.color.r * this.mass + body.color.r * body.mass) / (this.mass + body.mass),
      g: (this.color.g * this.mass + body.color.g * body.mass) / (this.mass + body.mass),
      b: (this.color.b * this.mass + body.color.b * body.mass) / (this.mass + body.mass),
    };

    this.mass += body.mass;
  }

  public radius(): number {
    return Math.sqrt(this.mass / Math.PI) / 2;
  }
}

interface Vector {
  x: number,
  y: number,
}

interface Color {
  r: number,
  g: number,
  b: number,
}
