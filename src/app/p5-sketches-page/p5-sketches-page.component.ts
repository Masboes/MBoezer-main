import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DemoSketch} from "./sketches/demo-sketch";
import {Sketch} from "./sketches/sketch";

@Component({
  selector: 'app-p5-sketches-page',
  templateUrl: './p5-sketches-page.component.html'
})
export class P5SketchesPageComponent implements OnInit {
  private sketchCards: Sketch[] = [
    new DemoSketch(),
  ];
  private cardsEnabled = true;

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
    for(let sketch of this.sketchCards) {
      if(sketch.sketchName == sketchName) {
        this.loadSketch(sketch);
      }
    }
  }

  private loadSketch(sketch: Sketch): void {
    sketch.init();
  }
}
