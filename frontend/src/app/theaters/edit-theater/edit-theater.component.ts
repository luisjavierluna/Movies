import { Component, OnInit } from '@angular/core';
import { createTheaterDTO, TheaterDTO } from '../theather';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css']
})
export class EditTheaterComponent implements OnInit {

  constructor() { }

  model: TheaterDTO = {name: "Sambil"};

  ngOnInit(): void {
  }

  saveChanges(theater: createTheaterDTO){
    console.log(theater);
  }
  
}
