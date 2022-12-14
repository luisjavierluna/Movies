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

  form: FormGroup

  @Input()
  model: actorDTO

  @Input()
  errors: string[] = []

  @Output()
  OnSubmit: EventEmitter<createActorDTO> = new EventEmitter<createActorDTO>();

  changedImage = false

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '', 
        {
          validators: [Validators.required]
        },
      ],
      birthDate: '',
      photo: '',
      biography: ''
    })

    if(this.model !== undefined){
      this.form.patchValue(this.model)
    }
  }

  selectedFile(file){
    this.changedImage = true
    this.form.get('photo').setValue(file)
  }

  changeMarkdown(text: string){
    this.form.get('biography').setValue(text)
  }

  onSubmit(){
    if (!this.changedImage){
      this.form.patchValue({'photo': null})
    }
    this.OnSubmit.emit(this.form.value);
  }

}
