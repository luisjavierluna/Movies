import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorMovieDTO } from 'src/app/actors/actor';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/MultipleSelectorModel';
import { createMovieDTO, MovieDTO } from '../movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private peliculasService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  model: MovieDTO
  noSelectedGenres: MultipleSelectorModel[];
  selectedGenres: MultipleSelectorModel[];
  selectedTheaters: MultipleSelectorModel[];
  noSelectedTheaters: MultipleSelectorModel[];
  selectedActors: actorMovieDTO[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: params => {
        this.peliculasService.putGet(params.id).subscribe({
          next: moviePutGet => {
            this.model = moviePutGet.movie;

            this.noSelectedGenres = moviePutGet.noSelectedGenres.map(genre => {
              return <MultipleSelectorModel> {key: genre.id, value: genre.name}
            });

            this.selectedGenres = moviePutGet.selectedGenres.map(genre => {
              return <MultipleSelectorModel> {key: genre.id, value: genre.name}
            });

            this.selectedTheaters = moviePutGet.selectedTheaters.map(theaters => {
              return <MultipleSelectorModel> {key: theaters.id, value: theaters.name}
            });

            this.noSelectedTheaters = moviePutGet.noSelectedTheaters.map(theaters => {
              return <MultipleSelectorModel> {key: theaters.id, value: theaters.name}
            });

            this.selectedActors = moviePutGet.actors;

          }
        })
      }
    })
  }

  saveChanges(movie: createMovieDTO){
    this.peliculasService.edit(this.model.id, movie).subscribe({
      next: () => this.router.navigate(['/movie/' + this.model.id])
    })
  }

  
}