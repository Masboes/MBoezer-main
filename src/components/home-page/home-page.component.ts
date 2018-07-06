import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Home");
  }

  ngOnInit() {
  }

}
