import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coordinate } from 'src/app/utilities/map/coordinate';
import { createTheaterDTO } from '../theater';

@Component({
  selector: 'app-form-theater',
  templateUrl: './form-theater.component.html',
  styleUrls: ['./form-theater.component.css']
})
export class FormTheaterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  errors: string[] = []

  @Input()
  model: createTheaterDTO;

  @Output()
  saveChanges: EventEmitter<createTheaterDTO> = new EventEmitter<createTheaterDTO>();

  initialCoordinate: Coordinate[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',
        {
          validators: [Validators.required],
        }
      ],
      latitude: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      longitude: [
        '',
        {
          validators: [Validators.required]
        }
      ]
    });

    if(this.model !== undefined){
      this.form.patchValue(this.model);
      this.initialCoordinate.push({latitude: this.model.latitude, longitude: this.model.longitude})
    }
  }

  selectedCoordinate(coordinate: Coordinate){
    this.form.patchValue(coordinate);
  }

  OnSubmit(){
    this.saveChanges.emit(this.form.value);
  }
}
