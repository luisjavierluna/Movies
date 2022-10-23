import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorMovieDTO } from 'src/app/actors/actor';
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
  errors: string[] = []
  
  @Input()
  model: MovieDTO;

  @Output()
  OnSubmit: EventEmitter<createMovieDTO> = new EventEmitter<createMovieDTO>();

  @Input()
  noSelectedGenres: MultipleSelectorModel[]

  selectedGenres: MultipleSelectorModel[] = []

  @Input()
  noSelectedTheaters: MultipleSelectorModel[]

  selectedTheaters: MultipleSelectorModel[] = []

  @Input()
  selectedActors: actorMovieDTO[] = []

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
      genresIds: '',
      theatersIds: '',
      actors: ''
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
    this.form.get('genresIds').setValue(genresIds)

    const theatersIds = this.selectedTheaters.map(val => val.key)
    this.form.get('theatersIds').setValue(theatersIds)

    const actors = this.selectedActors.map(val => {
      return {id: val.id, character: val.character}
    });
    this.form.get('actors').setValue(actors);

    this.OnSubmit.emit(this.form.value)
  }
}
