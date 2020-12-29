import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public MOCK_STORIES = [
    {
      image: 'https://firebasestorage.googleapis.com/v0/b/infocorner-2020.appspot.com/o/amigos-del-cine.png?alt=media',
      name: 'story-1',
      type: 'event',
    },
    {
      image: 'https://picsum.photos/100?random=11',
      name: 'story-2',
      type: 'notice',
    },
    {
      image: 'https://firebasestorage.googleapis.com/v0/b/infocorner-2020.appspot.com/o/128584651_3691962174158037_3854507652565640061_o.jpg?alt=media',
      name: 'story-3',
      type: 'news',
    },
    {
      image: 'https://picsum.photos/100?random=12',
      name: 'story-4',
      type: 'event',
    },
    {
      image: 'https://firebasestorage.googleapis.com/v0/b/infocorner-2020.appspot.com/o/ca-river-ebro.png?alt=media',
      name: 'story-5',
      type: 'news',
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
