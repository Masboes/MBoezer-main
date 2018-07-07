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
      p.translate(p.width/2, p.height/2)
      let width = Math.min(p.width, p.height) * 0.9;
      p.stroke(0);
      p.noFill();
      p.rect()
    }
  }

  private drawBoard(p: any): void {

  }
}
