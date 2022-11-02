import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { userDTO } from '../security';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-index-users',
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.css']
})
export class IndexUsersComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  users: userDTO[];
  columnsToShow = ['name', 'actions'];
  totalRecordsQuantity;
  currentPage = 1;
  recordsToShowQuantity = 10;

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsToShowQuantity)
  }

  loadRecords(page: number, numberElementsToShow){
    this.securityService.getUsers(page, numberElementsToShow)
    .subscribe({ next: (response: HttpResponse<userDTO[]>) => {
          this.users = response.body;
          this.totalRecordsQuantity = response.headers.get("totalRecordsQuantity");
        }, error: error => console.error(error)});
  }

  updatePagination(data: PageEvent){
    this.currentPage = data.pageIndex + 1;
    this.recordsToShowQuantity = data.pageSize;
    this.loadRecords(this.currentPage, this.recordsToShowQuantity);
  }

  makeAdmin(userId: string){
    this.securityService.makeAdmin(userId).subscribe({
      next: () => Swal.fire('Success', 'The operation was done correctly', 'success')
    })
  }

  removeAdmin(userId: string){
    this.securityService.removeAdmin(userId).subscribe({
      next: () => Swal.fire('Success', 'The operation was done correctly', 'success')
    })
  }

}
