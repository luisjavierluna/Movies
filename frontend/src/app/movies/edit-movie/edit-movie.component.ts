import { Component, OnInit } from '@angular/core';
import { MovieDTO } from '../movie';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor() { }

  model: MovieDTO = {title: 'Spider-Man', 'trailer': 'abc', inTheaters: true, summary: 'thing', 
  releaseDate: new Date(), poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgSLYeR2r0eYlaVxhkZ65bPtHlFrVlxo5APFkWlaaHlqEJIoa3'}

  ngOnInit(): void {
  }

}
