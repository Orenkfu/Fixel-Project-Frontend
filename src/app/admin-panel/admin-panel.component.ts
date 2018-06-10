import { LocalMovie } from './../models/local-movie';
import { MoviesService } from './../services/movies.service';
import { TmdbMovie } from './../models/tmdb-movie';
import { TmdbService } from './../services/tmdb.service';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  noResults: boolean;
  posterUrl: string = 'http://image.tmdb.org/t/p/w185/';

  constructor(private tmdbService: TmdbService, private moviesService: MoviesService) {
    this.movieAdded = new EventEmitter();
  }
  movieResults: TmdbMovie[];
  @Output() movieAdded: EventEmitter<LocalMovie>;
  findByName(form) {
    console.log(form.name);
    this.tmdbService.getByName(form.name).subscribe(res => {
      if (res['results'].length == 0) this.noResults = true;
      this.movieResults = res['results'].slice(0, 5);
    });
  }
  searchKeyUp() {
    this.noResults = false;
  }
  clear() {
    this.noResults = false;
    this.movieResults = null;
  }
  addToStore(movie: TmdbMovie) {
    this.moviesService.createMovie(this.tmdbService.toLocalMovie(movie)).subscribe(response => {
      this.movieAdded.emit(response);
    })
  }
  //assets path is hard coded here
  displayImage(path) {
    if (path) return this.posterUrl + path;
    else return '../assets/default-movie.png';
  }
  ngOnInit() {
  }

}
