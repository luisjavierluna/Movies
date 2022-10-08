import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createGenreDTO } from '../genre';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private router: Router) { }

  model: createGenreDTO = {name: 'Drama'}

  ngOnInit(): void {
  }

  saveChanges(genre: createGenreDTO){
    // ... save the changes
    console.log(genre);
    this.router.navigate(['/genres']);
  }

}
