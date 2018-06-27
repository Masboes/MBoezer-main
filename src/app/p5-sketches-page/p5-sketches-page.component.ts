import { Component, OnInit } from '@angular/core';
import {DemoSketch} from "./sketches/DemoSketch";

@Component({
  selector: 'app-p5-sketches-page',
  templateUrl: './p5-sketches-page.component.html'
})
export class P5SketchesPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let sketch = new DemoSketch();
    sketch.init();
  }

}
