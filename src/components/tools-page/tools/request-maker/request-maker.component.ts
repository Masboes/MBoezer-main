import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-request-maker-tool',
  templateUrl: './request-maker.component.html'
})
export class RequestMakerComponent implements OnInit {

  constructor(public titleService: Title) {
    this.titleService.setTitle("Tools: Request Maker");
  }

  ngOnInit() {
  }
}
