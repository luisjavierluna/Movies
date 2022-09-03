import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  
  movies;
  
  ngOnInit(): void {
    setTimeout(() => {
      this.movies = [{
        movieTitle: 'Spider-Man',
        releaseDate: new Date(),
        price: 1400.99
      },
      {
        movieTitle: 'Moana',
        releaseDate: new Date('2016-11-14'),
        price: 300.99
      }]
    }, 3000);
  }
}
