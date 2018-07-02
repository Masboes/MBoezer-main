import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";

export class GameOfLifeSketch extends Sketch {
  public sketchName: string = 'game-of-life';
  public sketchTitle: string = 'Game of Life';
  public sketchImage: string = '/assets/images/sketches/game-of-life-sketch.png';
  public sketchDescription: string = 'Recreation of Conway\'s Game of Life';

  private grid: boolean[][];

  // editable by settings
  private blockSize = 15;
  private frameRate = 5;

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()
      .addSliderField('blocksize', this.blockSize, {label: 'Block size', min: 10, max: 100})
      .addSliderField('frameRate', this.frameRate, {label: 'Updates per second', min: 1, max: 50 })
      .getForm();
  }

  public updateSettings(settings: any): void {
    this.blockSize = settings['blocksize'];
    this.frameRate = settings['frameRate'];
  }

  protected setup(p: any): () => void {
    return () => {
      this.grid = [];
      for(let x = 0; x < p.width / this.blockSize; x++) { // for each column
        this.grid[x] = [];

        for(let y = 0; y < p.height / this.blockSize; y++) { // for each row
          this.grid[x][y] = Math.random() >= 0.5;
        }
      }
    }
  }

  protected draw(p: any): () => void {
    return () => {
      p.background(235);
      this.updateGrid(p);
      this.drawGrid(p);
      p.frameRate(this.frameRate);
    }
  }

  private updateGrid(p: any) {
    let oldGrid = this.gridCopy();

    for(let x = 0; x < this.grid.length; x++) { // for each column
      for(let y = 0; y < this.grid[x].length; y++) { // for each row
        this.grid[x][y] = this.evaluateCell(x, y, oldGrid);
      }
    }
  }

  private drawGrid(p: any) {
    for(let x = 0; x < this.grid.length; x++) { // for each column
      for(let y = 0; y < this.grid[x].length; y++) { // for each row
        if(this.grid[x][y]) {
          p.noStroke();
          p.fill(0);
          p.rect(x * this.blockSize + 1, y * this.blockSize + 1, this.blockSize - 2, this.blockSize - 2); // 1 px padding
        }
      }
    }
  }

  private evaluateCell(x: number, y: number, grid: boolean[][]): boolean {
    let neightbourSum = this.getNeighborSum(x, y, grid);

    if(grid[x][y]) { // im alive
      return neightbourSum == 3 || neightbourSum == 2;
    } else { // im dead
      return neightbourSum ==3;
    }
  }

  private getNeighborSum(x: number, y: number, grid: boolean[][]): number {
    let left  = (x - 1 + grid.length) % grid.length;
    let right = (x + 1 + grid.length) % grid.length;
    let up    = (y + 1 + grid[0].length) % grid[0].length;
    let down  = (y - 1 + grid[0].length) % grid[0].length;

    let neightbors = [
      grid[left][up],
      grid[left][y],
      grid[left][down],
      grid[x][up],
      grid[x][down],
      grid[right][up],
      grid[right][y],
      grid[right][down],
    ];
    let sum = 0;

    for(let neighbor of neightbors) {
      if(neighbor) sum++;
    }

    return sum;
  }

  private gridCopy(): boolean[][] {
    let gridCopy = [];
    for(let i = 0; i < this.grid.length; i++) {
      gridCopy[i] = this.grid[i].slice();
    }
    return gridCopy;
  }
}
