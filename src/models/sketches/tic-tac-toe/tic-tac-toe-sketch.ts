import {Sketch} from "../sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";
import * as tictactoe from 'tictactoe-ai/dist/tictactoe.min.js';

export class TicTacToeSketch extends Sketch {
  public sketchName: string = 'tic-tac-toe';
  public sketchTitle: string = 'Tic Tac Toe versus AI';
  public sketchImage: string = '/assets/images/sketches/tic-tac-toe-sketch.png';
  public sketchDescription: string = 'Play tic tac toe against an unbeatable AI!';

  private board: string[][];
  private aiSymbol = 'X';
  private playerSymbol = 'O';
  private aiMove: boolean = true;
  private playerMove: boolean = false;

  public getSettingsForm(formFactory: FormFactory): Form {
    return formFactory.createFormBuilder()

      .getForm();
  }

  public updateSettings(settings: any): void {

  }

  protected setup(p: any): () => void {
    return () => {
      console.log('reset');
      this.aiMove = true;
      this.playerMove = false;
      this.board = [['', '', ''],['', '', ''],['', '', '']];
      p.draw();
    }
  }

  protected draw(p: any): () => void {
    return () => {
      p.translate(p.width/2, p.height/2);

      this.drawBoard(p);

      if(this.aiMove) {
        this.makeAIMove();
      }
    }
  }

  protected mousePressed(p: any): () => void {
    return () => {
      let width = Math.min(p.width, p.height) * 0.9;
      let mouseX = p.mouseX - p.width/2;
      let mouseY = p.mouseY - p.height/2;

      if(mouseX > -width/2 && mouseX < width/2 && mouseY > -width/2 && mouseY < width/2) {
        mouseX -= -width/2;
        mouseY -= -width/2;
        mouseX /= width/3;
        mouseY /= width/3;
        mouseX = Math.floor(mouseX);
        mouseY = Math.floor(mouseY);

        if(this.board[mouseX][mouseY] == '' && this.playerMove) {
          this.makePlayerMove(mouseX, mouseY);
        }
      }
    }
  }

  private drawBoard(p: any): void {
    console.log('draw');
    let width = Math.min(p.width, p.height) * 0.9;
    p.background(255);
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

  private finished(): boolean {
    let finished = false;

    for(let i = 0; i < 3; i++) {
      finished = finished || (this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2] && (this.board[i][0] == 'X' || this.board[i][0] == 'O'));
    }
    for(let i = 0; i < 3; i++) {
      finished = finished || (this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i] && (this.board[0][i] == 'X' || this.board[0][i] == 'O'));
    }
    finished = finished || (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2] && (this.board[1][1] == 'X' || this.board[1][1] == 'O'));
    finished = finished || (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0] && (this.board[1][1] == 'X' || this.board[1][1] == 'O'));

    return finished
  }

  private makeAIMove(): void {
    this.aiMove = false;
    this.playerMove= true;

    var board = new tictactoe.TicTacToeBoard(this.convertBoard()); //empty board flattened
    console.log(board.board);
    var aiTeam = board.oppositePlayer(this.playerSymbol);
    let aiPlayer = new tictactoe.TicTacToeAIPlayer();
    aiPlayer.initialize(aiTeam, board);
    var move = aiPlayer.makeMove();
    if(move != null){
      console.log(move);
      this.makeMove(move.y, move.x, this.aiSymbol);
    }
  }

  private makePlayerMove(col: number, row: number): void {
    this.playerMove = false;
    this.aiMove = true;
    this.makeMove(col, row, this.playerSymbol);
  }

  private makeMove(col: number, row: number, symbol: string): void {
    this.board[col][row] = symbol;
    if(this.finished()) {
      this.playerMove = false;
      this.aiMove = false;
    }
  }

  private convertBoard(): string[] {
    let board = [];
    for(let row = 0; row < this.board[0].length; row++) {
      for(let col = 0; col < this.board.length; col++) {
        board.push(this.board[col][row]);
      }
    }
    return board;
  }
}
