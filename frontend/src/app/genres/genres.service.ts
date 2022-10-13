import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createGenreDTO, genreDTO } from './genre';


@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'genres'

  public getAll(page: number, recordsToShowQuantity: number): Observable<any> {
    let params = new HttpParams()
    params = params.append('page', page.toString())
    params = params.append('recordsPerPage', recordsToShowQuantity.toString())
    return this.http.get<genreDTO[]>(this.apiURL, {observe: 'response', params})
  }

  public create(genre: createGenreDTO){
    return this.http.post(this.apiURL, genre)
  }
}
