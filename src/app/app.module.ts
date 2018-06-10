import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { MoviesService } from './services/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { OrderTicketComponent } from './order-ticket/order-ticket.component';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TmdbService } from './services/tmdb.service';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MovieCastComponent } from './movie-cast/movie-cast.component';
import { SignupComponent } from './signup/signup.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,

  },
  {
    path: 'movies/:id',
    component: SingleMovieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'purchase',
    component: OrderTicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    OrderTicketComponent,
    LoginComponent,
    MovieListComponent,
    SingleMovieComponent,
    HeaderComponent,
    MovieCastComponent,
    SignupComponent,
    AdminPanelComponent,
    SummaryPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JwtModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    TmdbService, MoviesService,
    AuthService, AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
