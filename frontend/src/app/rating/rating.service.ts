import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpClient: HttpClient) { }
  apiURL = environment.apiURL + 'rating';

  rate(movieId: number, score: number){
    return this.httpClient.post(this.apiURL, {movieId: movieId, score: score});
  }
}
