import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { authenticationResponse, usersCredentials } from './security';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }

  apiURL = environment.apiURL + 'accounts'

  isLoggedIn(): boolean {
    return false
  }

  getRol(): string {
    return ''
  }

  signIn(credentials: usersCredentials):Observable<authenticationResponse>{
    return this.httpClient.post<authenticationResponse>(this.apiURL + '/create', credentials);
  }
}
