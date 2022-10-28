import { Component, OnInit } from '@angular/core';
import { MovieDTO } from '../movies/movie';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}
  
  moviesInTheaters: MovieDTO[]
  moviesFutureReleases: MovieDTO[]

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.moviesService.getLandinPage().subscribe({
      next: landingPage => {
        this.moviesInTheaters = landingPage.inTheaters;
        this.moviesFutureReleases = landingPage.futureReleases;
      }
    })
  }

  deleted(){
    this.loadData();
  }

}
