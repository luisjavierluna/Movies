import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { TheatersService } from '../theaters.service';
import { createTheaterDTO } from '../theater';

@Component({
  selector: 'app-create-theater',
  templateUrl: './create-theater.component.html',
  styleUrls: ['./create-theater.component.css']
})
export class CreateTheaterComponent {

  errors: string[] = []

  constructor(private router: Router, private theatersService: TheatersService) { }

  saveChanges(theater: createTheaterDTO){
    this.theatersService.create(theater)
    .subscribe({
      next: () => this.router.navigate(['/theaters']),
      error: error => this.errors = parseErrorsAPI(error)
    })
  }

}
