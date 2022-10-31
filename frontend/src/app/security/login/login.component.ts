import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/utilities/utilities';
import { usersCredentials } from '../security';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private router: Router) { }

  errors: string[] = [];

  ngOnInit(): void {
  }

  login(credenciales: usersCredentials){
    this.securityService.login(credenciales).subscribe({
      next: response => {
        this.securityService.saveToken(response);
        this.router.navigate(['/']);
      }, error: errors => this.errors = parseErrorsAPI(errors)
    })
  }

}
