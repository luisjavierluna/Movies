import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  
  moviesInTheaters;
  moviesFutureReleases = [{
    movieTitle: 'Avengers: Endgame',
    releaseDate: new Date(),
    price: 1400.99
  },
  {
    movieTitle: 'Inception',
    releaseDate: new Date('2016-11-14'),
    price: 300.99
  },
  {
    movieTitle: 'Rocky',
    releaseDate: new Date('2016-11-14'),
    price: 300.99
  }]

  
  
  ngOnInit(): void {
    setTimeout(() => {
      this.moviesInTheaters = [{
        movieTitle: 'Spider-Man - Far From Home',
        releaseDate: new Date(),
        price: 1400.99
      },
      {
        movieTitle: 'Moana',
        releaseDate: new Date('2016-11-14'),
        price: 300.99
      }]  
    }, 500);

  }
}
