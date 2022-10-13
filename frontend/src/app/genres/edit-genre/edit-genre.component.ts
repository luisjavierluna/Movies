import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { createGenreDTO, genreDTO } from '../genre';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(
    private router: Router, 
    private genresService: GenresService,
    private activatedRoute: ActivatedRoute) { }

  model: genreDTO
  errors: string[] = []

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.genresService.getById(params.id)
        .subscribe({
          next: genre => {this.model = genre},
          error: () => this.router.navigate(['/genres'])
        })
    })
  }

  saveChanges(genre: createGenreDTO){
    this.genresService.edit(this.model.id, genre)
    .subscribe({
      next: () => {this.router.navigate(['/genres'])},
      error: error => this.errors = parseErrorsAPI(error)
    })
    
  }

}
