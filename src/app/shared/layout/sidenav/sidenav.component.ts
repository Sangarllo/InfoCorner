import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public LINKS = [
    {
      icon: 'home',
      path: 'home',
    },
    {
      icon: 'admin_panel_settings',
      path: 'admin',
    },
    {
      icon: 'calendar_today',
      path: 'calendario',
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
      icon: 'info',
      path: 'noticias',
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

  close(): void {
    console.log(`closing!`);
    this.close();
  }
}
