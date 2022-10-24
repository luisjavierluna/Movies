import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { ListGenericComponent } from './utilities/list-generic/list-generic.component';
import { MenuComponent } from './menu/menu.component';
import { RatingComponent } from './utilities/rating/rating.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { CreateTheaterComponent } from './theaters/create-theater/create-theater.component';
import { IndexTheaterComponent } from './theaters/index-theater/index-theater.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { EditTheaterComponent } from './theaters/edit-theater/edit-theater.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { FormGenresComponent } from './genres/form-genres/form-genres.component';
import { FilterMoviesComponent } from './movies/filter-movies/filter-movies.component';
import { FormActorsComponent } from './actors/form-actors/form-actors.component';
import { InputImgComponent } from './utilities/input-img/input-img.component';
import { InputMarkdownComponent } from './utilities/input-markdown/input-markdown.component';
import { FormTheaterComponent } from './theaters/form-theater/form-theater.component';
import { MapComponent } from './utilities/map/map.component';
import { FormMovieComponent } from './movies/form-movie/form-movie.component';
import { MultipleSelectorComponent } from './utilities/multiple-selector/multiple-selector.component';
import { AutocompleteActorsComponent } from './actors/autocomplete-actors/autocomplete-actors.component';
import { ShowErrorsComponent } from './utilities/show-errors/show-errors.component';
import { DetailMovieComponent } from './movies/detail-movie/detail-movie.component'

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    ListGenericComponent,
    MenuComponent,
    RatingComponent,
    LandingPageComponent,
    IndexGenresComponent,
    CreateGenreComponent,
    IndexActorsComponent,
    CreateActorComponent,
    CreateMovieComponent,
    CreateTheaterComponent,
    IndexTheaterComponent,
    EditActorComponent,
    EditGenreComponent,
    EditTheaterComponent,
    EditMovieComponent,
    FormGenresComponent,
    FilterMoviesComponent,
    FormActorsComponent,
    InputImgComponent,
    InputMarkdownComponent,
    FormTheaterComponent,
    MapComponent,
    FormMovieComponent,
    MultipleSelectorComponent,
    AutocompleteActorsComponent,
    ShowErrorsComponent,
    DetailMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
