import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { IsAdminGuard } from './is-admin.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { DetailMovieComponent } from './movies/detail-movie/detail-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { FilterMoviesComponent } from './movies/filter-movies/filter-movies.component';
import { IndexUsersComponent } from './security/index-users/index-users.component';
import { LoginComponent } from './security/login/login.component';
import { SignInComponent } from './security/sign-in/sign-in.component';
import { CreateTheaterComponent } from './theaters/create-theater/create-theater.component';
import { EditTheaterComponent } from './theaters/edit-theater/edit-theater.component';
import { IndexTheaterComponent } from './theaters/index-theater/index-theater.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'genres', component: IndexGenresComponent, canActivate: [IsAdminGuard]},
  {path: 'genres/create', component: CreateGenreComponent, canActivate: [IsAdminGuard]},
  {path: 'genres/edit/:id', component: EditGenreComponent, canActivate: [IsAdminGuard]},
  {path: 'actors', component: IndexActorsComponent, canActivate: [IsAdminGuard]},
  {path: 'actors/create', component: CreateActorComponent, canActivate: [IsAdminGuard]},
  {path: 'actors/edit/:id', component: EditActorComponent, canActivate: [IsAdminGuard]},
  {path: 'theaters', component: IndexTheaterComponent, canActivate: [IsAdminGuard]},
  {path: 'theaters/create', component: CreateTheaterComponent, canActivate: [IsAdminGuard]},
  {path: 'theaters/edit/:id', component: EditTheaterComponent, canActivate: [IsAdminGuard]},
  {path: 'movies/create', component: CreateMovieComponent, canActivate: [IsAdminGuard]},
  {path: 'movies/edit/:id', component: EditMovieComponent, canActivate: [IsAdminGuard]},
  {path: 'movies/search', component: FilterMoviesComponent},
  {path: 'movie/:id', component: DetailMovieComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'users', component: IndexUsersComponent, canActivate: [IsAdminGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
