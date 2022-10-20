import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { createTheaterDTO, theaterDTO } from '../theater';
import { TheatersService } from '../theaters.service';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css']
})
export class EditTheaterComponent implements OnInit {

  constructor(
    private router: Router, 
    private theatersService: TheatersService,
    private activatedRoute: ActivatedRoute) { }

  model: theaterDTO
  errors: string[] = []

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.theatersService.getById(params.id)
        .subscribe({
          next: theater => {this.model = theater},
          error: () => this.router.navigate(['/theaters'])
        })
    })
  }

  saveChanges(theater: createTheaterDTO){
    this.theatersService.edit(this.model.id, theater)
    .subscribe({
      next: () => {this.router.navigate(['/theaters'])},
      error: error => this.errors = parseErrorsAPI(error)
    }) 
  }
  
}
