import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      poster: ''
    });

    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  selectedFile(file: File) {
    this.form.get('poster').setValue(file);
  }

  changeMarkdown(text){
    this.form.get('resumen').setValue(text);
  }

  saveChanges(){
    this.OnSubmit.emit(this.form.value)
  }
}
