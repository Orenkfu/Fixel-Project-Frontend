import { MoviesService } from './../services/movies.service';
import { TmdbCast } from './../models/tmdb-cast';
import { Component, OnInit } from '@angular/core';
import { TmdbMovie } from '../models/tmdb-movie';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit {
  backdropPath: any;
  id: number;
  movie: TmdbMovie
  posterUrl: string = 'http://image.tmdb.org/t/p/w500';
  profileFullSize: string = 'http://image.tmdb.org/t/p/original'
  backdropUrl: string = 'http://image.tmdb.org/t/p/original';

  cast: TmdbCast;
  constructor(private tmdbService: TmdbService, private movieService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getMovie();
    this.getMovieCast();
  }

  getMovie() {
    this.tmdbService.getById(this.id).subscribe(
      response => {
        this.movie = response;
        this.backdropPath = `url(${this.backdropUrl + response['backdrop_path']})`
      })
  }
  getMovieCast() {
    this.tmdbService.getMovieCastByMovieId(this.id).subscribe(response => {
      this.cast = response['cast'].slice(0, 5);
    })
  }
}
