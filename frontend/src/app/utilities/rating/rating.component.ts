import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()
  maxRating = 5;
  @Input()
  selectedRating = 0;
  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();
  maxRatingArr = [];
  voted = false;
  previousRating;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }

  handleMouseEnter(index: number): void{
    this.selectedRating = index + 1;
  }

  handleMouseLeave(){
    if(this.previousRating !== 0){
      this.selectedRating = this.previousRating;
    }else{
      this.selectedRating = 0;
    }
  }

  rate(index: number): void{
    if(this.securityService.isLoggedIn()){
      this.selectedRating = index + 1;
      this.voted = true;
      this.previousRating = this.selectedRating;
      this.rated.emit(this.selectedRating);
    } else{
      Swal.fire('You must log in', "Can't perform this action", "error")
    }
  }
}
