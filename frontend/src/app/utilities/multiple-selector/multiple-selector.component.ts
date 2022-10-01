import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './MultipleSelectorModel';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.css']
})
export class MultipleSelectorComponent implements OnInit {

  constructor() { }

  @Input()
  Selected: MultipleSelectorModel[] = [];

  @Input()
  NoSelected: MultipleSelectorModel[] = [];

  ngOnInit(): void {
  }

  select(item: MultipleSelectorModel, index:number){
    this.Selected.push(item);
    this.NoSelected.splice(index, 1);
  }

  deselect(item: MultipleSelectorModel, index:number){
    this.NoSelected.push(item);
    this.Selected.splice(index, 1);
  }

  selectAll(){
    this.Selected.push(...this.NoSelected)
    this.NoSelected = [];
  }

  deselectAll(){
    this.NoSelected.push(...this.Selected)
    this.Selected = [];
  }
}
