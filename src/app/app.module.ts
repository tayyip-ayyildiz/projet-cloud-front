import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { provideHttpClient } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [] 
})
export class AppModule { }
