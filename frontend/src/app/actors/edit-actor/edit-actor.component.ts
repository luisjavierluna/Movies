import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { actorDTO, createActorDTO } from '../actor';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(
    private router: Router, 
    private actorsService: ActorsService,
    private activatedRoute: ActivatedRoute) { }

  model: actorDTO
  errors: string[] = []

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.actorsService.getById(params.id)
        .subscribe({
          next: actor => {this.model = actor},
          error: () => this.router.navigate(['/actors'])
        })
    })
  }

  saveChanges(actor: createActorDTO){
    this.actorsService.edit(this.model.id, actor)
    .subscribe({
      next: () => {this.router.navigate(['/actors'])},
      error: error => this.errors = parseErrorsAPI(error)
    })
    
  }
}
