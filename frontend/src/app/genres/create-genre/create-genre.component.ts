import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstCapitalLetter } from 'src/app/utilities/validators/firstCapitalLetter';
import { genreCreateDTO } from '../genre';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent{

  constructor(private router: Router, ) { }

  saveChanges(genre: genreCreateDTO){
    // ... save the changes
    console.log(genre);
    this.router.navigate(['/genres']);
  }
}
