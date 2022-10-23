import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorMovieDTO } from '../actor';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-autocomplete-actors',
  templateUrl: './autocomplete-actors.component.html',
  styleUrls: ['./autocomplete-actors.component.css']
})
export class AutocompleteActorsComponent implements OnInit {

  constructor(private actorsService: ActorsService) { }

  control: FormControl = new FormControl

  @Input()
  selectedActors: actorMovieDTO[] = []

  actorsToShow: actorMovieDTO[] = [];

  columnsToShow = ['photo', 'name', 'character', 'actions']

  @ViewChild(MatTable) table: MatTable<any>

  ngOnInit(): void {
    this.control.valueChanges.subscribe(name => {
      if(typeof name === 'string' && name){
        this.actorsService.getByName(name).subscribe({
          next: actors => {this.actorsToShow = actors;}
    })}
  })}

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value)
    this.selectedActors.push(event.option.value);
    this.control.patchValue('')
    if (this.table !== undefined){
      this.table.renderRows()
    }
  }

  remove(actor){
    const index = this.selectedActors.findIndex(a => a.name === actor.name);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  dragEnds(event: CdkDragDrop<any[]>){
    const previousIndex = this.selectedActors.findIndex(
      actor => actor === event.item.data
    )
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex)
    this.table.renderRows();
  }
}
