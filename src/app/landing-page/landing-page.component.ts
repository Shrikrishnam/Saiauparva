

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {

  img_loc: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit() {
    this.img_loc = "/app/beat.png"
  }

  placeAppt() {
    this.router.navigate(['place-fitness-trainer-appointment']);
  }
  
}
