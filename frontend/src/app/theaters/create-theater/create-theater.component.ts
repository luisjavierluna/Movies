import { Component, OnInit } from '@angular/core';
import { createTheaterDTO } from '../theather';

@Component({
  selector: 'app-create-theater',
  templateUrl: './create-theater.component.html',
  styleUrls: ['./create-theater.component.css']
})
export class CreateTheaterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(theater: createTheaterDTO){
    console.log(theater);
  }

}
