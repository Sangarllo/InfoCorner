import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onHomeClick(): void {
    this.router.navigate(['.']);
  }

  public gotoEntities(): void {
    this.router.navigate(['entidades']);
  }

  public gotoPlaces(): void {
    this.router.navigate(['lugares']);
  }
}
