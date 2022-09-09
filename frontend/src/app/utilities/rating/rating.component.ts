import { Component, Input, OnInit } from '@angular/core';

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
  maxRatingArr = [];
  voted = false;
  previousRating;

  constructor() { }

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
    this.selectedRating = index + 1;
    this.voted = true;
    this.previousRating = this.selectedRating;
  }
}
