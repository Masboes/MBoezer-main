import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-request-maker-tool',
  templateUrl: './request-maker.component.html'
})
export class RequestMakerComponent implements OnInit {

  constructor(public titleService: Title, private http: HttpClient) {
    this.titleService.setTitle("Tools: Request Maker");
  }

  ngOnInit() {
  }

  sendRequest() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'sometoken',
      })
    };

    this.http.get('https://i.ytimg.com/vi/e3PdcKcUvDY/maxresdefault.jpg').subscribe(data => {
      console.log(data);
    });
  }
}
