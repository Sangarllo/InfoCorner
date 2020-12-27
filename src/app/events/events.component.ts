import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '@auth/auth.service';
import { IEvent } from '@models/event';
import { IUser } from '@models/user';
import { EventService } from '@services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private currentUser: IUser;
  public events$!: Observable<IEvent[]>;
  displayedColumns: string[] = [ 'image', 'status', 'id', 'name', 'actions3'];

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private eventSrv: EventService,
  ) { }

  ngOnInit(): void {

    this.authSrv.currentUser$.subscribe( (currentUser: IUser) => {
      this.currentUser = currentUser;
    })

    this.events$ = this.eventSrv.getAllEvents();
  }

  public gotoItem(event: IEvent): void {
    this.router.navigate([`eventos/${event.id}`]);
  }

  public editItem(event: IEvent): void {
    this.router.navigate([`eventos/${event.id}/editar`]);
  }

  public deleteItem(event: IEvent): void {
    console.log(`deleting ${event.id}`);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción de borrado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventSrv.deleteEvent(event, this.currentUser);
        Swal.fire(
          '¡Borrado!',
          `${event.name} ha sido borrado`,
          'success'
        );
      }
    });
  }

  public addItem(): void {
    this.router.navigate([`eventos/0/editar`]);
  }
}
