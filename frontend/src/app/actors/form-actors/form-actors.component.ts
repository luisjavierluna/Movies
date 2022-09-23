import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createActorDTO } from '../actor';

@Component({
  selector: 'app-form-actors',
  templateUrl: './form-actors.component.html',
  styleUrls: ['./form-actors.component.css']
})
export class FormActorsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  model: createActorDTO;

  @Output()
  submit: EventEmitter<createActorDTO> = new EventEmitter<createActorDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '', 
        {
          validators: [Validators.required]
        },
      ],
      dateOfBirth: ''
    })

    if(this.model !== undefined){
      this.form.patchValue(this.model)
    }
  }

  onSubmit(){
    this.submit.emit(this.form.value);
  }

}
