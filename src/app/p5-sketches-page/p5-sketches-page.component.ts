import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DemoSketch} from "./sketches/demo-sketch";
import {Sketch} from "./sketches/sketch";
import {SketchCard} from "./sketch-card";

@Component({
  selector: 'app-p5-sketches-page',
  templateUrl: './p5-sketches-page.component.html'
})
export class P5SketchesPageComponent implements OnInit {
  private sketchCards: SketchCard = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if(params['sketch']) {
        this.loadSketchByName(params['sketch']);
      } else {
        this.fetchCards();
      }
    })
  }

  private loadSketchByName(sketch: string): void {
    console.log(sketch);
    console.log(DemoSketch.sketchName)
    switch (sketch) {
      case DemoSketch.sketchName: {
        this.loadSketch(new DemoSketch());
        break;
      }
    }
  }

  private loadSketch(sketch: Sketch): void {
    sketch.init();
  }

  private fetchCards(): void {

  }
}
