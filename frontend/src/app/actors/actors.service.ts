import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDate } from '../utilities/utilities';
import { actorDTO, createActorDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'actors';

  public getAll(page: number, recordsToShowQuantity: number): Observable<any> {
    let params = new HttpParams()
    params = params.append('page', page.toString())
    params = params.append('recordsPerPage', recordsToShowQuantity.toString())
    return this.http.get<actorDTO[]>(this.apiURL, {observe: 'response', params})
  }

  public getById(id: number): Observable<actorDTO>{
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`)
  }

  public create(actor: createActorDTO){
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiURL, formData);
  }

  public edit(id: number, actor: createActorDTO){
    const formData = this.buildFormData(actor);
    return this.http.put(`${this.apiURL}/${id}`, formData);
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

  public delete(id:number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
