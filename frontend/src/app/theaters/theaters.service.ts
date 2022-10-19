import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createTheaterDTO } from './theater';

@Injectable({
  providedIn: 'root'
})
export class TheatersService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'theaters'

  public create(theater: createTheaterDTO){
    return this.http.post(this.apiURL, theater)
  }
}
