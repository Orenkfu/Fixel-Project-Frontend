import { LocalMovie } from './../models/local-movie';
import { TmdbMovie } from './../models/tmdb-movie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cast } from '../models/cast';


@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  key: string = 'api_key=d3937f004d701f1cb4c4b659a6ae6366';
  url: string = 'https://api.themoviedb.org/3/';
  readAccessToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzkzN2YwMDRkNzAxZjFjYjRjNGI2NTlhNmFlNjM2NiIsInN1YiI6IjViMTY4ZGUxYzNhMzY4NTM0MjAxNTg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiWSTBYKI1zafAO74mEPIQLrJRnLks829tHUd4OsyvQ"

  constructor(private http: HttpClient) {
  }
  discoverPopularMovies() {
    return this.http.get<TmdbMovie[]>(`https://api.themoviedb.org/3/discover/movie?${this.key}&primaryreleasedate.gte=2016-01-01`)
  }

  getById(id: number) {
    return this.http.get<TmdbMovie>(`${this.url}movie/${id}?${this.key}`)
  }
  getByName(name: string) {
    const url = `${this.url}search/movie?${this.key}&query=${name}`
    return this.http.get<TmdbMovie[]>(url);
  }
  getMovieCastByMovieId(id: number) {
    return this.http.get<Cast[]>(`${this.url}movie/${id}/credits?${this.key}`)
  }
  toLocalMovie(movie: TmdbMovie): LocalMovie {
    return {
      _id: "",
      tmdbId: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      __v: ""
    };
  }
}
