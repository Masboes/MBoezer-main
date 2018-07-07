import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";
import {SketchColor} from "../sketch-color";

export class TicTacToeSketch extends Sketch {
  public sketchName: string = 'tic-tac-toe';
  public sketchTitle: string = 'Tic Tac Toe versus AI';
  public sketchImage: string = '/assets/images/sketches/tic-tac-toe-sketch.png';
  public sketchDescription: string = 'Play tic tac toe against an unbeatable AI!';

  private board: string[][];

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()

      .getForm();
  }

  public updateSettings(settings: any): void {

  }

  protected setup(p: any): () => void {
    return () => {
      this.board = [['', '', ''],['', '', ''],['', '', '']];
    }
  }

  protected draw(p: any): () => void {
    return () => {
      p.translate(p.width/2, p.height/2);
      this.drawBoard(p);
    }
  }

  private drawBoard(p: any): void {
    let width = Math.min(p.width, p.height) * 0.9;
    p.stroke(0);
    p.noFill();
    for(let i = 0; i < this.board.length; i++) {
      for(let j = 0; j < this.board[i].length; j++) {
        p.rect(-width/2 + i * width/3, -width/2 + j * width/3, width/3, width/3);

        if(this.board[i][j] == 'X') {
          p.strokeWeight(4);
          p.stroke(0);
          p.line(-width/2 + i * width/3, -width/2 + j * width/3, -width/2 + (i+1) * width/3, -width/2 + (j+1) * width/3);
          p.line(-width/2 + i * width/3, -width/2 + (j+1) * width/3, -width/2 + (i+1) * width/3, -width/2 + j * width/3);
        } else if (this.board[i][j] == 'O') {
          p.ellipse(-width/2 + i * width/3 + width/6, -width/2 + j * width/3 + width/6, width/3, width/3)
        }
      }
    }
  }

  private finished(p: any): boolean {
    let finished = false;

    for(let i = 0; i < 3; i++) {
      finished = finished || (this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2] && (this.board[i][0] == 'X' || this.board[i][0] == 'O'));
    }
    for(let i = 0; i < 3; i++) {
      finished = finished || (this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i] && (this.board[0][i] == 'X' || this.board[0][i] == 'O'));
    }
    finished = finished || (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2] && (this.board[1][1] == 'X' || this.board[1][1] == 'O'));
    finished = finished || (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[0][2] && (this.board[1][1] == 'X' || this.board[1][1] == 'O'));

    return finished
  }
}
