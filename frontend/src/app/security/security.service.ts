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
  private readonly tokenKey = 'token';
  private readonly expirationKey = 'token-expiracion';

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);

    if(!token){
      return false;
    }

    const expiration = localStorage.getItem(this.expirationKey);
    const expirationDate = new Date(expiration);

    if(expirationDate <= new Date()){
      this.logout();
      return false;
    }
    
    return true
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
  }

  getRol(): string {
    return ''
  }

  getFieldJWT(field: string): string{
    const token = localStorage.getItem(this.tokenKey);
    if(!token){return '';}
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  signIn(credentials: usersCredentials):Observable<authenticationResponse>{
    return this.httpClient.post<authenticationResponse>(this.apiURL + '/create', credentials);
  }

  login(creadentials: usersCredentials):Observable<authenticationResponse>{
    return this.httpClient.post<authenticationResponse>(this.apiURL + '/login', creadentials);
  }

  saveToken(AuthenticationResponse: authenticationResponse){
    localStorage.setItem(this.tokenKey, AuthenticationResponse.token);
    localStorage.setItem(this.expirationKey, AuthenticationResponse.expiration.toString());
  }

  getToken(){
    return localStorage.getItem(this.tokenKey)
  }
}
