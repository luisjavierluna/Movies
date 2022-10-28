import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieDTO } from '../movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }
  @Input()
  movies: MovieDTO[]

  @Output()
  deleted: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
      
  }

  delete(movieId: number): void{
    this.moviesService.delete(movieId)
    .subscribe({
      next: () => this.deleted.emit
    })
  }
}
