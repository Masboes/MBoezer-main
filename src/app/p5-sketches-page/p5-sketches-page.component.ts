import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DemoSketch} from "./sketches/demo-sketch";
import {Sketch} from "./sketches/sketch";
import {GameOfLifeSketch} from "./sketches/game-of-life-sketch";
import {SolarSystemSketch} from "./sketches/solar-system-sketch";

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

  constructor(private activatedRoute: ActivatedRoute) { }

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
  }

  public refreshBtn(): void {
    this.loadSketchByName(this.currentSketch.sketchName);
  }
}
