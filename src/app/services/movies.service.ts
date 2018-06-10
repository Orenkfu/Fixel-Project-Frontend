import { AuthService } from './auth.service';
import { TmdbMovie } from './../models/tmdb-movie';
import { LocalMovie } from './../models/local-movie';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url: string = '/api/movies';
  constructor(private http: HttpClient, private authService: AuthService) { }


  getMovies() {
    const authHeader = this.authService.appendAuthHeader();
    return this.http.get<LocalMovie[]>(this.url, { headers: authHeader });
  }
  createMovie(movie: LocalMovie) {
    const authHeader = this.authService.appendAuthHeader();
    return this.http.post<LocalMovie>(this.url, movie, { headers: authHeader });
  }
  deleteMovieById(id) {
    const authHeader = this.authService.appendAuthHeader();
    return this.http.delete<LocalMovie>(`${this.url}/${id}`, { headers: authHeader })
  }
  sortMoviesBy(property) {
    const authHeader = this.authService.appendAuthHeader();
    let Params = new HttpParams().append('sortBy', property);
    return this.http.get<LocalMovie[]>(this.url, { headers: authHeader, params: Params });
  }
}