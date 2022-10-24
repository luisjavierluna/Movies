import { Component, OnInit } from '@angular/core';
import { createMovieDTO, MovieDTO } from '../movie';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor() { }

  model: MovieDTO

  ngOnInit(): void {
  }

  saveChanges(movie: createMovieDTO){
    console.log(movie);
  }
}
