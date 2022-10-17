import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { genreDTO } from 'src/app/genres/genre';
import { actorDTO } from '../actor';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  constructor(private actorService: ActorsService) { }

  actors: actorDTO[]
  columnsToShow = ['id', 'name', 'actions']
  
  totalRecordsQuantity
  currentPage = 1
  recordsToShowQuantity = 10

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsToShowQuantity)
  }

  loadRecords(page: number, recordsToShowQuantity){
    this.actorService.getAll(page, recordsToShowQuantity)
    .subscribe({
      next: (response: HttpResponse<actorDTO[]>) => {
        this.actors = response.body
        this.totalRecordsQuantity = response.headers.get("totalRecordsQuantity")
      },
      error: error => console.error(error)
    })
  }

  updatePagination(data: PageEvent) {
    this.currentPage = data.pageIndex + 1
    this.recordsToShowQuantity = data.pageSize
    this.loadRecords(this.currentPage, this.recordsToShowQuantity)
  }

  delete(id: number){
    this.actorService.delete(id)
    .subscribe({
      next: () => this.loadRecords(this.currentPage, this.recordsToShowQuantity),
      error: error => console.error(error)
    })
  }

}
