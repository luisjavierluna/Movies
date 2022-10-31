import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usersCredentials } from '../security';

@Component({
  selector: 'app-form-authentication',
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.css']
})
export class FormAuthenticationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  form: FormGroup;

  @Input()
  errors: string[] = [];
  @Input()
  action: string;
  @Output()
  onSubmit: EventEmitter<usersCredentials> = new EventEmitter<usersCredentials>();


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required]
        }
      ]
    })
  }

  getEmailErrorMessage(){
    var field = this.form.get('email');
    if(field.hasError('required')){
      return 'The field email is required';
    }

    if(field.hasError('email')){
      return 'The email is not valid';
    }

    return '';
  }

}
