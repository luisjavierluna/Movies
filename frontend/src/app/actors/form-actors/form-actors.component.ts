import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorDTO, createActorDTO } from '../actor';

@Component({
  selector: 'app-form-actors',
  templateUrl: './form-actors.component.html',
  styleUrls: ['./form-actors.component.css']
})
export class FormActorsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  model: actorDTO;

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
      dateOfBirth: '',
      photo: ''
    })

    if(this.model !== undefined){
      this.form.patchValue(this.model)
    }
  }

  selectedFile(file){
    this.form.get('photo').setValue(file)
  }

  onSubmit(){
    this.submit.emit(this.form.value);
  }

}
