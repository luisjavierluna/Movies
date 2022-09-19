import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { genreCreateDTO } from '../genre';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private router: Router) { }

  model: genreCreateDTO = {name: 'Drama'}

  ngOnInit(): void {
  }

  saveChanges(genre: genreCreateDTO){
    // ... save the changes
    console.log(genre);
    this.router.navigate(['/genres']);
  }

}
