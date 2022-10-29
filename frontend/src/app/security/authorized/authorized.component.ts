import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  @Input()
  rol: string

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  isAuthorized(): boolean {
    if(this.rol) {
      return this.securityService.getRol() === this.rol
    }else{
      return this.securityService.isLoggedIn()
    }
    
  }

}
