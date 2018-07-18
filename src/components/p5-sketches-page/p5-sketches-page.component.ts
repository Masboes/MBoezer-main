import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DemoSketch} from "../../models/sketches/demo-sketch/demo-sketch";
import {Sketch} from "../../models/sketches/sketch";
import {GameOfLifeSketch} from "../../models/sketches/game-of-life/game-of-life-sketch";
import {SolarSystemSketch} from "../../models/sketches/solar-system/solar-system-sketch";
import {FormFactory} from "../../models/form/form-factory";
import {Form} from "../../models/form/form";
import {WalkerSketch} from "../../models/sketches/walker/walker-sketch";
import {Title} from "@angular/platform-browser";
import {FlowFieldSketch} from "../../models/sketches/flow-field/flow-field-sketch";
import {PiApproximationSketch} from "../../models/sketches/pi-approximation/pi-approximation-sketch";
import {TicTacToeSketch} from "../../models/sketches/tic-tac-toe/tic-tac-toe-sketch";

@Component({
  selector: 'app-p5-sketches-page',
  templateUrl: './p5-sketches-page.component.html'
})
export class P5SketchesPageComponent implements OnInit {
  public sketchCards: Sketch[] = [
    new GameOfLifeSketch(),
    new SolarSystemSketch(),
    new WalkerSketch(),
    new FlowFieldSketch(),
    new PiApproximationSketch(),
    new TicTacToeSketch(),
  ];
  public cardsEnabled = true;
  public currentSketch: Sketch;

  public sketchSettingsVisible: boolean = false; // whether the settings form is opened
  public form : Form|null; // settings form

  constructor(private formFactory: FormFactory, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle("P5 Sketches");
  }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if(params['sketch']) {
        this.cardsEnabled = false;
        this.loadSketchByName(params['sketch']);
        this.titleService.setTitle("P5 Sketches - " + this.currentSketch.sketchTitle);
      }
    })
  }

  public refreshBtn(): void {
    this.loadSketchByName(this.currentSketch.sketchName, false);
  }

  public screenshotBtn(): void {
    this.currentSketch.saveScreenshot();
  }

  public settingsBtn(): void {
    this.sketchSettingsVisible = !this.sketchSettingsVisible;
  }

  private loadSketch(sketch: Sketch, updateSettings=true): void {
    sketch.init();
    this.currentSketch = sketch;

    if(updateSettings){
      this.form = this.currentSketch.getSettingsForm(this.formFactory);
    }
  }

  private loadSketchByName(sketchName: string, updateSettings=true): void {
    if(this.currentSketch) {
      this.currentSketch.remove();
    }
    for(let sketch of this.sketchCards) {
      if(sketch.sketchName == sketchName) {
        this.loadSketch(sketch, updateSettings);
      }
    }
  }
}
