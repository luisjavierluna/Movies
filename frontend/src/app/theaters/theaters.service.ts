import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createTheaterDTO, theaterDTO } from './theater';

@Injectable({
  providedIn: 'root'
})
export class TheatersService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'theaters'

  public create(theater: createTheaterDTO){
    return this.http.post(this.apiURL, theater)
  }

  public getAll(page: number, recordsToShowQuantity: number): Observable<any> {
    let params = new HttpParams()
    params = params.append('page', page.toString())
    params = params.append('recordsPerPage', recordsToShowQuantity.toString())
    return this.http.get<theaterDTO[]>(this.apiURL, {observe: 'response', params})
  }
  
  public getById(id: number): Observable<theaterDTO>{
    return this.http.get<theaterDTO>(`${this.apiURL}/${id}`)
  }

  public edit(id: number, theater: createTheaterDTO){
    return this.http.put(`${this.apiURL}/${id}`, theater)
  }

  public delete(id:number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}