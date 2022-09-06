import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  constructor() { }
  @Input()
  movies;


  ngOnInit(): void {
      
  }

}
