import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

import { IBase } from '@models/base';

export enum SwalMessage {
  NO_CHANGES = 'NO_CHANGES',
  OK_CHANGES = 'OK_CHANGES',
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public compareFunction(o1: IBase, o2: IBase): boolean {
    return (o1.name === o2.name && o1.id === o2.id);
  }

  public swalFire(opt: SwalMessage, extraInfo?: string): void {
    switch (opt) {
      case SwalMessage.NO_CHANGES:
        Swal.fire({
          icon: 'warning',
          title: 'Datos no modificados',
          text: `Has cerrado la ventana sin guardar ningún cambio`,
        });
        break;

      case SwalMessage.OK_CHANGES:
        Swal.fire({
            icon: 'success',
            title: 'Datos guardados con éxito',
            text: `La información sobre ${extraInfo} ha sido guarda correctamente`
        });
        break;

      default:
        break;
    }
  }

  public getDistanceTimestamp(timestamp: string): string {
    const timestampDate = new Date(timestamp);
    return formatDistance(
      timestampDate,
      new Date(),
      {locale: es}
    );
  }
}
