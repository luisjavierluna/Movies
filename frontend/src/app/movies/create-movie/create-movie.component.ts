import { Component, OnInit } from '@angular/core';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/MultipleSelectorModel';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { createMovieDTO } from '../movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  errors: string[] = [];
  noSelectedGenres: MultipleSelectorModel[];
  noSelectedTheaters: MultipleSelectorModel[];

  ngOnInit(): void {
    this.moviesService.postGet()
    .subscribe({
      next: result => {
        this.noSelectedGenres = result.genres.map(genre => {
          return <MultipleSelectorModel> {key: genre.id, value: genre.name}
        });

        this.noSelectedTheaters = result.theaters.map(theater => {
          return <MultipleSelectorModel> {key: theater.id, value: theater.name}
        });

      },
      error: error => console.error(error)
    });
  }

  saveChanges(movie: createMovieDTO){
    this.moviesService.create(movie)
    .subscribe({
      next: () => console.log('success'),
      error: error => this.errors = parseErrorsAPI(error)
    })
  }

}