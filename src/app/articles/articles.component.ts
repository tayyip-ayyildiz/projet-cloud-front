import { Component } from '@angular/core';
import { ArticlesServiceService } from '../articles-service.service';
import { Article } from '../entity/Article';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-articles',
  imports: [RouterModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

  article : Article = {
    id: '',
    name: '',
    description: '',
    image: ' '
  }; 
  id : string = ''

  constructor(private articleService: ArticlesServiceService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    const idParameter: string | null = this.route.snapshot.paramMap.get('id')
    if (idParameter !== null) {
      this.id = idParameter
      this.articleService.getArticleFromId(this.id)
        .subscribe((article) => this.article = article)
    }
  }

  remove(id:string){
    this.articleService.deleteArticleFromId(this.id).subscribe((r)=>this.goBack())
  }

  goBack(): void {
    this.router.navigate(['/'])
  }
}
