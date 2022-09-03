import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  constructor() { }
  movies;


  ngOnInit(): void {
    this.movies = [{
      movieTitle: 'Spider-Man - Far From Home',
      releaseDate: new Date(),
      price: 1400.99
    },
    {
      movieTitle: 'Moana',
      releaseDate: new Date('2016-11-14'),
      price: 300.99
    }]
  }

}
