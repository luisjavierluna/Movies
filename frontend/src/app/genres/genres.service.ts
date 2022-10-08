import { HttpClient } from '@angular/common/http';
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

  public getAll(): Observable<genreDTO[]> {
    return this.http.get<genreDTO[]>(this.apiURL)
  }

  public create(genre: createGenreDTO){
    return this.http.post(this.apiURL, genre);
  }
}
