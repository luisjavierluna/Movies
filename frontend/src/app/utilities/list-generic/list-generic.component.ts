import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-generic',
  templateUrl: './list-generic.component.html',
  styleUrls: ['./list-generic.component.css']
})
export class ListGenericComponent implements OnInit {

  @Input()
  list;
  constructor() { }

  ngOnInit(): void {
  }

}
