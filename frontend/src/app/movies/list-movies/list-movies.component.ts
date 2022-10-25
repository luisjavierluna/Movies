import { Component, Input, OnInit } from '@angular/core';
import { MovieDTO } from '../movie';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  constructor() { }
  @Input()
  movies: MovieDTO[]


  ngOnInit(): void {
      
  }

  remove(movieIndex: number): void{
    this.movies.splice(movieIndex, 1)
  }
}
