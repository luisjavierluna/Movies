import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { genreDTO } from '../genre';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  constructor(private genresService: GenresService) { }

  genres: genreDTO[]
  columnsToShow = ['id', 'name', 'actions']
  
  totalRecordsQuantity
  currentPage = 1
  recordsToShowQuantity = 10

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsToShowQuantity)
  }

  loadRecords(page: number, recordsToShowQuantity){
    this.genresService.getAll(page, recordsToShowQuantity)
    .subscribe({
      next: (response: HttpResponse<genreDTO[]>) => {
        this.genres = response.body
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
}
