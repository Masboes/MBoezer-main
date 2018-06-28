import {Sketch} from "./sketch";

export class GameOfLifeSketch extends Sketch {
  public sketchName: string = 'game-of-life';
  public sketchTitle: string = 'Game of Life';
  public sketchImage: string = '/assets/images/sketches/demo-sketch.png';
  public sketchDescription: string = 'Demo sketch to test the system.';

  readonly blockSize = 15;
  private grid: boolean[][] = [];

  protected setup(p: any): () => void {
    return () => {
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
