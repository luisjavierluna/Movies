import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { firstCapitalLetter } from 'src/app/utilities/validators/firstCapitalLetter';
import { createGenreDTO } from '../genre';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent{

  errors: string[] = []

  constructor(private router: Router, private genresService: GenresService) { }

  saveChanges(genre: createGenreDTO){
    this.genresService.create(genre)
    .subscribe({
      next: () => this.router.navigate(['/genres']),
      error: error => this.errors = parseErrorsAPI(error)
    })
  }
}
