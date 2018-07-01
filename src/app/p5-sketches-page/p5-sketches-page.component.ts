import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DemoSketch} from "./sketches/demo-sketch";
import {Sketch} from "./sketches/sketch";
import {GameOfLifeSketch} from "./sketches/game-of-life-sketch";
import {SolarSystemSketch} from "./sketches/solar-system-sketch";
import {FormFactory} from "../../form/form-factory";
import {Form} from "../../form/form";

@Component({
  selector: 'app-p5-sketches-page',
  templateUrl: './p5-sketches-page.component.html'
})
export class P5SketchesPageComponent implements OnInit {
  public sketchCards: Sketch[] = [
    new DemoSketch(),
    new GameOfLifeSketch(),
    new SolarSystemSketch(),
  ];
  public cardsEnabled = true;
  public currentSketch: Sketch;

  public sketchSettingsVisible: boolean = false;
  public form : Form|null;

  @ViewChild('.p5Canvas') private canvas: any;

  constructor(private activatedRoute: ActivatedRoute, private formFactory: FormFactory) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if(params['sketch']) {
        this.cardsEnabled = false;
        this.loadSketchByName(params['sketch']);
      }
    })
  }

  private loadSketchByName(sketchName: string): void {
    if(this.currentSketch) {
      this.currentSketch.remove();
    }
    for(let sketch of this.sketchCards) {
      if(sketch.sketchName == sketchName) {
        this.loadSketch(sketch);
      }
    }
  }

  private loadSketch(sketch: Sketch): void {
    sketch.init();
    this.currentSketch = sketch;
    this.form = this.currentSketch.getSettingsForm(this.formFactory)
  }

  public refreshBtn(): void {
    this.loadSketchByName(this.currentSketch.sketchName);
  }

  public screenshotBtn(): void {
    this.currentSketch.saveScreenshot();
  }

  public settingsBtn(): void {
    this.sketchSettingsVisible = !this.sketchSettingsVisible;
  }

  public sketchSettingsChange(event: any): void {

  }
}
