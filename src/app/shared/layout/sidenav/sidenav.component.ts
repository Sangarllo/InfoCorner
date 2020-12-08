import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public LINKS = [
    {
      icon: 'apps',
      path: 'admin',
    },
    {
      icon: 'account_circle',
      path: 'usuarios',
    },
    {
      icon: 'campaign',
      path: 'avisos',
    },
    {
      icon: 'event',
      path: 'eventos',
    },
    {
      icon: 'group_work',
      path: 'entidades',
    },
    {
      icon: 'place',
      path: 'lugares',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
