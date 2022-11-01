import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from 'src/app/rating/rating.service';
import { CoordinateWithMessage } from 'src/app/utilities/map/coordinate';
import Swal from 'sweetalert2';
import { MovieDTO } from '../movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {

  constructor(private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ratingService: RatingService) { }

    movie: MovieDTO;
    realeaseDate: Date;
    trailerURL: SafeResourceUrl
    coordinates: CoordinateWithMessage[] = []

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: params => {
        this.moviesService.getById(params.id).subscribe({
          next: movie => {
            this.movie = movie;
            this.realeaseDate = new Date(this.movie.releaseDate);
            this.trailerURL = this.generateURLYoutubeEmbed(this.movie.trailer);
            this.coordinates = movie.theaters.map(theater => {
              return {longitude: theater.longitude, latitude: theater.latitude, message: theater.name}
            });
          }}
        )
      }}
    )
  }

  rated(score: number){
    this.ratingService.rate(this.movie.id, score).subscribe({
      next: () => {
        Swal.fire("Success", "Your voto was received", 'success');
      }
    })
  }

  generateURLYoutubeEmbed(url: any): SafeResourceUrl {
    if(!url){
      return '';
    }

    var video_id = url.split('v=')[1];
    var positionAmpersand = video_id.indexOf('&');
    if(positionAmpersand !== -1){
      video_id = video_id.substring(0, positionAmpersand);
    }

    return this.sanitizer
    .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video_id}`)
  }

}
