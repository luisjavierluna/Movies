import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstCapitalLetter } from 'src/app/utilities/validators/firstCapitalLetter';
import { createGenreDTO } from '../genre';

@Component({
  selector: 'app-form-genres',
  templateUrl: './form-genres.component.html',
  styleUrls: ['./form-genres.component.css']
})
export class FormGenresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  model: createGenreDTO;

  @Output()
  onSubmit: EventEmitter<createGenreDTO> = new EventEmitter<createGenreDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3), firstCapitalLetter()]
      }]
    });

    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  saveChanges(){
    this.onSubmit.emit(this.form.value);
  }

  getErrorFieldName(){
    var field = this.form.get('name');
    if(field.hasError('required')){
      return 'The field name is required'
    }

    if(field.hasError('minLenght')){
      return 'The minimum length is 3 characters'
    }

    if(field.hasError('firstUppercaseLetter')){
      return field.getError('firstUppercaseLetter').message;
    }
    
    return '';
  }

}
