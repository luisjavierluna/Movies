import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { authenticationResponse, userDTO, usersCredentials } from './security';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }

  apiURL = environment.apiURL + 'accounts'
  private readonly tokenKey = 'token';
  private readonly expirationKey = 'token-expiracion';
  private readonly fieldRole = 'role'

  public getUsers(page: number, recordsToShowQuantity: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsToShowQuantity.toString());
    return this.httpClient.get<userDTO[]>(`${this.apiURL}/userslist`, 
    {observe: 'response', params})
  }

  makeAdmin(userId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/makeAdmin`, JSON.stringify(userId), {headers});
  }

  removeAdmin(userId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/RemoveAdmin`, JSON.stringify(userId), {headers});
   }

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

  getRole(): string {
    return this.getFieldJWT(this.fieldRole)
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
