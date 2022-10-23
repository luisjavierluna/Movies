import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoviePostGet } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'movies';

  public postGet(): Observable<MoviePostGet>{
    return this.http.get<MoviePostGet>(`${this.apiURL}/postget`);
  }
}
