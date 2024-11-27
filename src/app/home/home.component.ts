import { Component } from '@angular/core';
import { ArticlesServiceService } from '../articles-service.service';
import { Article } from '../entity/Article';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  articles:Array<Article>
  ready:boolean

  constructor(private articleService:ArticlesServiceService){
    this.articles=[];
    this.ready=false;
  }

  ngOnInit(): void {
    this.articleService.all().subscribe({
      next: (a) => {
        this.articles = a;
        this.ready = true;
      },
      error: (error) => console.error(error),
    });
  }
  

}
