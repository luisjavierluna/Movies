import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  moviesInTheaters;
  moviesFutureReleases = []

  ngOnInit(): void {
    this.moviesInTheaters = [{
      movieTitle: 'Spider-Man - Far From Home',
      releaseDate: new Date(),
      price: 1400.99,
      poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgSLYeR2r0eYlaVxhkZ65bPtHlFrVlxo5APFkWlaaHlqEJIoa3'
    },
    {
      movieTitle: 'Moana',
      releaseDate: new Date('2016-11-14'),
      price: 300.99,
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0I_NLZX7ywKTPOE6dP5IORzdjWJvBLz7ZLeyVR0HHuXieSF6l'
    }]  
  };

}
