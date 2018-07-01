import {SketchVector} from "./sketch-vector";
import {SketchColor} from "./sketch-color";

export class GravitationalBody {
  readonly bigG = 6.67408e-11; // 'big' 'e-11'

  public mass: number;
  public position: SketchVector;
  public velocity: SketchVector;
  public color: SketchColor;
  public active: boolean = true; // false if it has been absorbed

  constructor(mass: number, color: SketchColor, position: SketchVector, velocity: SketchVector = {x:0, y:0}) {
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

  private calculateForce(body1: GravitationalBody, body2: GravitationalBody): SketchVector {
    let range = this.distance(body1.position, body2.position);
    let force = -1 * this.bigG * (body1.mass * body2.mass) / range;
    return {
      x: force * (body1.position.x - body2.position.x) / range,
      y: force * (body1.position.y - body2.position.y) / range,
    };
  }

  private applyAcceleration(acceleration: SketchVector, deltaTime: number): void {
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

  private calculateAcceleration(force: SketchVector): SketchVector {
    return {
      x: force.x / this.mass, // F = m * a => a = F / m
      y: force.y / this.mass,
    }
  }

  private distance(vector1: SketchVector, vector2: SketchVector): number {
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
