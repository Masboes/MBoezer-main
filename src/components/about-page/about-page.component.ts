import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html'
})
export class AboutPageComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("About");
  }

  ngOnInit() {
  }

}
