import { Component, OnInit } from '@angular/core';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { usersCredentials } from '../security';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  errors: string[] = [];

  signIn(credentials: usersCredentials){
    this.securityService.signIn(credentials).subscribe({
      next: response => {
        console.log(response);
      },
      error: errors => this.errors = parseErrorsAPI(errors)
    })
  }

}
