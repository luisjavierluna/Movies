import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/MultipleSelectorModel';
import { createMovieDTO, MovieDTO } from '../movie';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  model: MovieDTO;

  @Output()
  OnSubmit: EventEmitter<createMovieDTO> = new EventEmitter<createMovieDTO>();

  noSelectedGenres: MultipleSelectorModel[] = [
    {key: 1, value: 'Drama'},
    {key: 2, value: 'Action'},
    {key: 3, value: 'Comedy'},
  ]

  selectedGenres: MultipleSelectorModel[] = [];

  noSelectedTheaters: MultipleSelectorModel[] = [
    {key: 1, value: 'Sambil'},
    {key: 2, value: 'Agora'},
    {key: 3, value: 'Acrópolis'},
  ]

  selectedTheaters: MultipleSelectorModel[] = []

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genresId: '',
      theatersId: ''
    });

    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  selectedFile(file: File) {
    this.form.get('poster').setValue(file);
  }

  changeMarkdown(text){
    this.form.get('summary').setValue(text);
  }

  saveChanges(){
    const genresIds = this.selectedGenres.map(val => val.key)
    this.form.get('genresId').setValue(genresIds)

    const theatersIds = this.selectedTheaters.map(val => val.key)
    this.form.get('theatersId').setValue(theatersIds)

    this.OnSubmit.emit(this.form.value)
  }
}
