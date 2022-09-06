import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { ListGenericComponent } from './utilities/list-generic/list-generic.component';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    ListGenericComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
