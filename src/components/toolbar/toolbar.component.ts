import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: '[app-toolbar]',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  constructor(public titleService: Title) {}

  ngOnInit() {
  }
}
