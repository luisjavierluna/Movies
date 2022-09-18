import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstCapitalLetter } from 'src/app/utilities/validators/firstCapitalLetter';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3), firstCapitalLetter()]
      }]
    });
  }

  saveChanges(){
    // ... save the changes
    this.router.navigate(['/genres']);
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
