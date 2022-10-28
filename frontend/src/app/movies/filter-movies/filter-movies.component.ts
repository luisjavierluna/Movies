import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { genreDTO } from 'src/app/genres/genre';
import { GenresService } from 'src/app/genres/genres.service';
import { MoviesService } from '../movies.service';
import { MovieDTO } from '../movie';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filter-movies',
  templateUrl: './filter-movies.component.html',
  styleUrls: ['./filter-movies.component.css']
})
export class FilterMoviesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private genresService: GenresService,
    private moviesService: MoviesService) { }

  form: FormGroup;
  genres: genreDTO[] = [];
  currentPage = 1;
  numberItemsToDisplay = 10;
  numberItems;

  movies: MovieDTO[]

  originalForm = {
    title: '',
    genreId: 0,
    futureReleases: false,
    inTheaters: false
  }

  ngOnInit(): void {
    this.genresService.getAll()
    .subscribe({
      next: genres => {
        this.genres = genres
        
        this.form = this.formBuilder.group(this.originalForm)
        this.readValuesURL();
        this.searchMovies(this.form.value);
    
        this.form.valueChanges
          .subscribe(values => {
            this.searchMovies(values)
            this.writeSearchParametersInURL()
        })
      }
    })
  }

  private readValuesURL(){
    this.activatedRoute.queryParams.subscribe((params) => {
      var object: any = {};

      if(params.title){
        object.title = params.title;
      }

      if(params.genreId){
        object.genreId = Number(params.genreId);
      }

      if(params.futureReleases){
        object.futureReleases = params.futureReleases;
      }

      if(params.inTheaters){
        object.inTheaters = params.inTheaters;
      }

      this.form.patchValue(object);
    })
  }

  private writeSearchParametersInURL(){
    var queryStrings = [];

    var formValues = this.form.value;

    if (formValues.title) {
      queryStrings.push(`title=${formValues.title}`)
    }

    if (formValues.genreId) {
      queryStrings.push(`genreId=${formValues.genreId}`)
    }

    if (formValues.futureReleases) {
      queryStrings.push(`futureReleases=${formValues.futureReleases}`)
    }

    if (formValues.inTheaters) {
      queryStrings.push(`inTheaters=${formValues.inTheaters}`)
    }

    this.location.replaceState('movies/search', queryStrings.join('&'))
  }

  searchMovies(values: any) {
    values.page = this.currentPage;
    values.recordsPerPage = this.numberItemsToDisplay;
    this.moviesService.filter(values).subscribe(response => {
      this.movies = response.body;
      this.writeSearchParametersInURL();
      this.numberItems = response.headers.get('totalRecordsQuantity');
    })
  }

  clean(){
    this.form.patchValue(this.originalForm);
  }

  paginatorUpdate(data: PageEvent){
    this.currentPage = data.pageIndex + 1;
    this.numberItemsToDisplay = data.pageSize;
    this.searchMovies(this.form.value);
  }
}
