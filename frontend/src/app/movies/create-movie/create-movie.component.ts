import { Component, OnInit } from '@angular/core';
import { createMovieDTO } from '../movie';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(movie: createMovieDTO){
    console.log(movie)
  }
}
