import { OrdersService } from './../services/orders.service';
import { AuthService } from './../services/auth.service';
import { map } from 'rxjs/operators';
import { LocalMovie } from './../models/local-movie';
import { MoviesService } from './../services/movies.service';
import { TmdbService } from './../services/tmdb.service';
import { Component, OnInit } from '@angular/core';
import { TmdbMovie } from '../models/tmdb-movie';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  posterUrl: string = 'http://image.tmdb.org/t/p/w185/';
  movieList: LocalMovie[];
  sortByProperty: string;
  constructor(
    private orderService: OrdersService,
    private movieService: MoviesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMovies();
  }
  //sets this component's sortByProperty(useful for maintaining order when a new movie is added) and sends a sort query to the database
  //**patched in late and is just good enough to maintan but needs refactoring for better readability and maintainability
  sort(property) {
    this.sortByProperty = property;
    this.movieService.sortMoviesBy(property.value).subscribe(res => this.movieList = res);
  }
  isAdmin() {
    return this.authService.isUserAdmin();
  }
  movieAdded(event) {
    this.sort(this.sortByProperty);
  }
  deleteMovie(id: number) {
    this.movieService.deleteMovieById(id).subscribe(response => {
      const index = this.movieList.findIndex((movie) => movie._id === response._id)
      this.movieList.splice(index, 1);
    })
  }
  purchaseTicket(movie) {
    const order = {
      user: this.authService.currentUserId(),
      movie: {
        _id: movie._id,
        title: movie.title
      },
      price: 39.99
    }
    this.orderService.purchaseTicket(order).subscribe(response => this.router.navigate(['/purchase']));


  }
  identify(index, item) {
    return item._id;
  }

  getMovies() {
    this.movieService.getMovies().subscribe(response => {
      this.movieList = response;
    });
  }
}