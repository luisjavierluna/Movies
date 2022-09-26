import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createTheaterDTO } from '../theather';

@Component({
  selector: 'app-form-theater',
  templateUrl: './form-theater.component.html',
  styleUrls: ['./form-theater.component.css']
})
export class FormTheaterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  model: createTheaterDTO;

  @Output()
  saveChanges: EventEmitter<createTheaterDTO> = new EventEmitter<createTheaterDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',
        {
          validators: [Validators.required],
        }
      ]
    });

    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  OnSubmit(){
    this.saveChanges.emit(this.form.value);
  }
}
