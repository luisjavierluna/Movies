import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { formatDate } from '../utilities/utilities';
import { createActorDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'actors';

  public create(actor: createActorDTO){
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiURL, formData);
  }

  private buildFormData(actor: createActorDTO): FormData {
    const formData = new FormData();
    formData.append('name', actor.name);
    if (actor.biography) {
      formData.append('biography', actor.biography);
    }
    if(actor.birthDate){
      formData.append('birthDate', formatDate(actor.birthDate));
    }
    if(actor.photo){
      formData.append('photo', actor.photo);
    }

    return formData;
  }
}
