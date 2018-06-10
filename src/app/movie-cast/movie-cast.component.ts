import { TmdbService } from './../services/tmdb.service';
import { TmdbCast } from './../models/tmdb-cast';
import { Component, OnInit } from '@angular/core';
import { Cast } from '../models/cast';
import { Input } from '@angular/core';


@Component({
  selector: 'movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.css']
})
export class MovieCastComponent implements OnInit {
  cast: Cast[];
  profileUrl: string = 'http://image.tmdb.org/t/p/w45';
  profileFullSize: string = 'http://image.tmdb.org/t/p/original';

  @Input('id') id: number;
  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
    this.tmdbService.getMovieCastByMovieId(this.id).subscribe(res => {
      this.cast = res['cast'].slice(0, 5);
    });
  }

}
