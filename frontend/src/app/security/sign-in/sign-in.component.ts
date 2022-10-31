import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { usersCredentials } from '../security';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  errors: string[] = [];

  signIn(credentials: usersCredentials){
    this.securityService.signIn(credentials).subscribe({
      next: response => {
        this.securityService.saveToken(response)
        this.router.navigate(['/'])
      },
      error: errors => this.errors = parseErrorsAPI(errors)
    })
  }

}
