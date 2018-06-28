declare let p5;

export abstract class Sketch {
  public static sketchName: string = 'some-sketch';
  public static sketchTitle: string = 'Some Sketch';
  public static sketchImage: string = '../../../assets/images/default-sketch.png';
  private holderId: string = 'sketch-holder';

  protected p5; // declare it to please typescript

  public init(): void {
    let holder = document.querySelector('#' + this.holderId);
    this.p5 = new p5(this.sketch(holder));
  }

  protected sketch(holder: Element): (p: any) => void {
    let me = this;
    return (p: any) => {
      p.setup = () => {
        let canvas = p.createCanvas(holder.clientWidth, holder.clientHeight);
        canvas.parent('sketch-holder');

        me.setup(p)();
      };

      p.draw = () => {
        if(holder.clientWidth != p.width || holder.clientHeight != p.height) {
          p.resizeCanvas(holder.clientWidth, holder.clientHeight);
        }

        me.draw(p)();
      };
    };

  }

  protected abstract setup(p: any): () => void;
  protected abstract draw(p: any): () => void;
}
