import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlaceService } from '@services/places.service';
import { Observable } from 'rxjs';
import { IPlace } from '@shared/models/place';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  public places$!: Observable<IPlace[]>;
  displayedColumns: string[] = [ 'image', 'active', 'id', 'name', 'locality', 'actions3'];

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
    console.log(`deleting ${place.id}`);
  }

  public addItem(): void {
    this.router.navigate([`lugares/0/editar`]);
  }
}
