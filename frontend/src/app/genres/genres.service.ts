import { Injectable } from '@angular/core';
import { genreDTO } from './genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor() { }

  public getAll(): genreDTO[] {
    return [{id: 1, name: 'Drama'}]
  }
}
