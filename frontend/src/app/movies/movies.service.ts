import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDate } from '../utilities/utilities';
import { createMovieDTO, LandingPageDTO, MovieDTO, MoviePostGet, MoviePutGet } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'movies';

  public getLandinPage(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(this.apiURL);
  }

  public getById(id: number): Observable<MovieDTO>{
    return this.http.get<MovieDTO>(`${this.apiURL}/${id}`);
  }

  public postGet(): Observable<MoviePostGet>{
    return this.http.get<MoviePostGet>(`${this.apiURL}/postget`);
  }

  public putGet(id: number): Observable<MoviePutGet>{
    return this.http.get<MoviePutGet>(`${this.apiURL}/putget/${id}`);
  }

  public create(movie: createMovieDTO){
    const formData = this.BuildFormData(movie);
    return this.http.post(this.apiURL, formData);
  }

  
  public edit(id: number, movie: createMovieDTO){
    const formData = this.BuildFormData(movie);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  private BuildFormData(movie: createMovieDTO): FormData {
    const formData = new FormData();

    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));
    if(movie.releaseDate){
      formData.append('releaseDate', formatDate(movie.releaseDate));
    }

    if(movie.poster){
      formData.append('poster', movie.poster);
    }

    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('theatersIds', JSON.stringify(movie.theatersIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }
}
