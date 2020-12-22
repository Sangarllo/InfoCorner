import { Component, Input } from '@angular/core';

import Swal from 'sweetalert2';

import { UserRole } from '@models/user-role.enum';

@Component({
  selector: 'app-role-options',
  templateUrl: './role-options.component.html',
  styleUrls: ['./role-options.component.scss']
})
export class RoleOptionsComponent  {

  @Input() role: UserRole

  constructor() { }

  onNotImplementedClick(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Funcionalidad aún no disponible',
      text: `Esta posibilidad aún no está disponbile, ${this.role}`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
  }

}
