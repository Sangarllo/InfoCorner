import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NoticeService } from '@services/notices.service';
import { Observable } from 'rxjs';
import { INotice } from '@shared/models/notice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  public notices$!: Observable<INotice[]>;
  displayedColumns: string[] = [ 'image', 'id', 'name', 'description', 'actions3'];

  constructor(
    private router: Router,
    private noticeSrv: NoticeService,
  ) { }

  ngOnInit(): void {
    this.notices$ = this.noticeSrv.getAllNotices();
  }

  public gotoItem(notice: INotice): void {
    this.router.navigate([`avisos/${notice.id}`]);
  }

  public editItem(notice: INotice): void {
    this.router.navigate([`avisos/${notice.id}/editar`]);
  }

  public deleteItem(notice: INotice): void {
    console.log(`Borrando ${notice.id}`);
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
        this.noticeSrv.deleteNotice(notice);
        Swal.fire(
          '¡Borrado!',
          `${notice.name} ha sido borrado`,
          'success'
        );
      }
    });
  }

  public addItem(): void {
    this.router.navigate([`avisos/0/editar`]);
  }
}
