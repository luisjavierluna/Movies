import { Component, OnInit } from '@angular/core';
import { genreDTO } from '../genre';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  constructor(private genresService: GenresService) { }

  genres: genreDTO[]
  columnsToShow = ['id', 'name', 'actions']

  ngOnInit(): void {
    this.genresService.getAll()
    .subscribe({
      next: genres => this.genres = genres,
      error: error => console.error(error)
    })
  }

}
