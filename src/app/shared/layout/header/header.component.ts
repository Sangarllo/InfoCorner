import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';

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

  public onEntitiesClick(): void {
    this.router.navigate(['entidades']);
  }

}
