import { Component, OnInit } from '@angular/core';
import { createTheaterDTO, theaterDTO } from '../theater';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css']
})
export class EditTheaterComponent implements OnInit {

  constructor() { }

  model: theaterDTO = {name: "Sambil", latitude: 20.676003014849915, longitude: -103.34514856338502};

  ngOnInit(): void {
  }

  saveChanges(theater: createTheaterDTO){
    console.log(theater);
  }
  
}
