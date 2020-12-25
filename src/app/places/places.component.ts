import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { IPlace } from '@models/place';
import { PlaceService } from '@services/places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  public places$!: Observable<IPlace[]>;
  displayedColumns: string[] = [ 'image', 'id', 'name', 'locality', 'type', 'actions3'];

  constructor(
    private router: Router,
    private placeSrv: PlaceService,
  ) { }

  ngOnInit(): void {
    this.places$ = this.placeSrv.getAllPlaces();
  }

  public gotoItem(place: IPlace): void {
    this.router.navigate([`lugares/${place.id}`]);
  }

  public editItem(place: IPlace): void {
    this.router.navigate([`lugares/${place.id}/editar`]);
  }

  public deleteItem(place: IPlace): void {
    console.log(`Borrando ${place.id}`);
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
        this.placeSrv.deletePlace(place);
        Swal.fire(
          '¡Borrado!',
          `${place.name} ha sido borrado`,
          'success'
        );
      }
    });
  }

  public addItem(): void {
    this.router.navigate([`lugares/0/editar`]);
  }
}
