import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    "../../assets/home-page/css/bootstrap.min.css",
    "../../assets/home-page/css/main.css",
  ]
})

export class HomePageComponent {

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('Home');
  }

  public getStartedBtn(): void {
    this.router.navigate(['/p5-sketches']);
  }
}
