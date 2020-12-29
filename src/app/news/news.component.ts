import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NewsService } from '@services/news.services';
import { Observable } from 'rxjs';
import { INewsItem, NewsItem } from '@shared/models/news';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news$!: Observable<INewsItem[]>;
  displayedColumns: string[] = [ 'image', 'id', 'name', 'sourceName', 'actions3'];

  constructor(
    private router: Router,
    private newsSrv: NewsService,
  ) { }

  ngOnInit(): void {
    this.news$ = this.newsSrv.getAllNews();
  }

  public gotoItem(newsItem: INewsItem): void {
    this.router.navigate([`${NewsItem.PATH_URL}/${newsItem.id}`]);
  }

  public editItem(newsItem: INewsItem): void {
    this.router.navigate([`${NewsItem.PATH_URL}/${newsItem.id}/editar`]);
  }

  public deleteItem(newsItem: INewsItem): void {
    console.log(`Borrando ${newsItem.id}`);
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
        this.newsSrv.deleteNewsItem(newsItem);
        Swal.fire(
          '¡Borrada!',
          `${newsItem.name} ha sido borrada`,
          'success'
        );
      }
    });
  }

  public addItem(): void {
    this.router.navigate([`${NewsItem.PATH_URL}/0/editar`]);
  }
}
