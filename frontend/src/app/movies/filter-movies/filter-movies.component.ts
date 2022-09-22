import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-movies',
  templateUrl: './filter-movies.component.html',
  styleUrls: ['./filter-movies.component.css']
})
export class FilterMoviesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute) { }

  form: FormGroup;

  genres = [
    {id: 1, name: 'Drama'},
    {id: 2, name: 'Action'},
    {id: 3, name: 'Comedy'}
  ]

  movies = [
    {title: 'Spider-Man: No Way Home', inTheaters: false, futureReleases: true, genres: [1, 2], poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgSLYeR2r0eYlaVxhkZ65bPtHlFrVlxo5APFkWlaaHlqEJIoa3'},
    {title: 'Moana', inTheaters: true, futureReleases: false, genres: [3], poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0I_NLZX7ywKTPOE6dP5IORzdjWJvBLz7ZLeyVR0HHuXieSF6l'},
    {title: 'Inception', inTheaters: false, futureReleases: false, genres: [1, 3], poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfzT9O0IBDumCXZjeAIhSYLANDT5ip_dwMNKr9-fBQfaSuD3sv'},
  ]

  moviesOriginal = this.movies;

  originalForm = {
    title: '',
    genreId: 0,
    futureReleases: false,
    inTheaters: false
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.originalForm)
    this.readValuesURL();
    this.searchMovies(this.form.value);

    this.form.valueChanges
      .subscribe(values => {
        this.movies = this.moviesOriginal;
        this.searchMovies(values)
        this.writeSearchParametersInURL()
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
    if (values.title) {
      this.movies = this.movies.filter(movie => movie.title.indexOf(values.title) !== -1)
    }

    if(values.genreId !== 0){
      this.movies = this.movies.filter(movie => movie.genres.indexOf(values.genreId) !== -1)
    }

    if(values.futureReleases){
      this.movies = this.movies.filter(movie => movie.futureReleases)
    }

    if(values.inTheaters){
      this.movies = this.movies.filter(movie => movie.inTheaters)
    }
  }

  clean(){
    this.form.patchValue(this.originalForm);
  }

}
