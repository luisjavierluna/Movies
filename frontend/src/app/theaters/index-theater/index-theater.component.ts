import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { theaterDTO } from '../theater';
import { TheatersService } from '../theaters.service';

@Component({
  selector: 'app-index-theater',
  templateUrl: './index-theater.component.html',
  styleUrls: ['./index-theater.component.css']
})
export class IndexTheaterComponent implements OnInit {

  constructor(private theatersService: TheatersService) {}

  theaters: theaterDTO[]
  columnsToShow = ['id', 'name', 'actions']
  
  totalRecordsQuantity
  currentPage = 1
  recordsToShowQuantity = 10

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsToShowQuantity)
  }

  loadRecords(page: number, recordsToShowQuantity){
    this.theatersService.getAll(page, recordsToShowQuantity)
    .subscribe({
      next: (response: HttpResponse<theaterDTO[]>) => {
        this.theaters = response.body
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
    this.theatersService.delete(id)
    .subscribe({
      next: () => this.loadRecords(this.currentPage, this.recordsToShowQuantity),
      error: error => console.error(error)
    })
  }

}
