import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'tools-page',
  templateUrl: './tools-page.component.html'
})
export class ToolsPageComponent implements OnInit {


  constructor(private titleService: Title) {
    this.titleService.setTitle("Tools");
  }

  ngOnInit() {

  }
}
