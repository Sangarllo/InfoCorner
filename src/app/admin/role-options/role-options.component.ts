import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { EventEntityDialogComponent } from '@app/events/event-entity-dialog/event-entity-dialog.component';
import { UserRole } from '@models/user-role.enum';
import { IEvent, Event } from '@models/event';
import { Base } from '@models/base';
import { EventService } from '@services/events.service';

@Component({
  selector: 'app-role-options',
  templateUrl: './role-options.component.html',
  styleUrls: ['./role-options.component.scss']
})
export class RoleOptionsComponent  {

  @Input() role: UserRole

  public dialogConfig = new MatDialogConfig();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private eventSrv: EventService
  ) { }

  onNotImplementedClick(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Funcionalidad aún no disponible',
      text: `Esta posibilidad aún no está disponbile, ${this.role}`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
  }

  gotoProfile(): void {
    this.router.navigate([`admin/perfil`]);
  }

  gotoNewEventFromScratch(): void {
    this.router.navigate([`eventos/0/editar`]);
  }

  openEntityDialog(): void {
    let event: IEvent = Event.InitDefault();
    this.dialogConfig.data = event;
    const dialogRef = this.dialog.open(EventEntityDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      const entity = eventDialog.entity;
      const entityRol = eventDialog.entityRol;
      const eventId = this.eventSrv.addEventFromEntity(event, entity, entityRol);
      this.router.navigate([`eventos/${eventId}`]);
    });
  }
}
