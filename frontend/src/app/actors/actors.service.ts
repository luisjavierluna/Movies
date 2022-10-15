import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createActorDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'actors';

  public create(actor: createActorDTO){
    return this.http.post(this.apiURL, actor);
  }
}
