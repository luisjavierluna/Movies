import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { createActorDTO } from '../actor';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  constructor(private actorsService: ActorsService, private router: Router) { }

  ngOnInit(): void {
  }

  errors = []

  saveChanges(actor: createActorDTO){
    console.log(actor);
    this.actorsService.create(actor)
    .subscribe({
      next: () => this.router.navigate(['/actors']),
      error: errors => this.errors = parseErrorsAPI(errors)
    })
  }

}
