import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete-actors',
  templateUrl: './autocomplete-actors.component.html',
  styleUrls: ['./autocomplete-actors.component.css']
})
export class AutocompleteActorsComponent implements OnInit {

  constructor() { }

  control: FormControl = new FormControl

  actors = [
    {name: 'Tom Holland', image: 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQp7XNv6HleTfZwfX7nSAAOEM3Dntv26l7EICMisSls6G65kv_YNX9j87ORQ1TZhZTP'},
    {name: 'Tom Hanks', image: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTdeoR9slyrVN9PXuFEKaX_8MeW4YvmD1C5I4EOR5ERheDLpU96gxlussXC5pibExli'},
    {name: 'Samuel L. Jackson', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSimO6w0Cd3ljSmsHCzH-RSl13g3Jt5IlQ1NiSZRyiGUAxKw5rm'},
  ]

  originalActors = this.actors

  selectedActors = []

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      this.actors = this.originalActors
      this.actors = this.actors.filter(actor => actor.name.indexOf(value) !== -1)
    })
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value)
    this.selectedActors.push(event.option.value);
    this.control.patchValue('')
  }
}
