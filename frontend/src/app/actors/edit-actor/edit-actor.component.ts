import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createActorDTO } from '../actor';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  model: createActorDTO = {name: 'Felipe', dateOfBirth: new Date}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // alert(params.id);
    })
  }

  saveChanges(actor: createActorDTO){
    console.log(actor);
  }
}
