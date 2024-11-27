import { Component } from '@angular/core';
import { Article } from '../entity/Article';
import { ArticlesServiceService } from '../articles-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  imports: [RouterModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'
})
export class EditArticleComponent {

  id:string=''
  article: Article = {

    id:'',
    name:'',
    description:'',
    image:''

  }


  constructor(private articleService: ArticlesServiceService,
              private location:Location,
              private route: ActivatedRoute
  ) { }

  private set(name: string, description: string, image:string): void {
    this.article.name = name
    this.article.description = description
    this.article.image = image
  
  }

  goBack(): void {
    this.location.back()
  }

  update(name: string, description: string, image:string): void {
  
    if (this.id !== undefined) {
      if (name.length !== 0 && description.length!==0 && image.length!==0) {
        this.set(name, description, image)
        this.articleService.modifyArticle(this.article).subscribe(()=>this.goBack());        
      }   
    }
  }

  ngOnInit(): void {
    const idParameter: string | null = this.route.snapshot.paramMap.get('id')
    if (idParameter !== null) {
      this.id = idParameter
      this.articleService.getArticleFromId(this.id)
      .subscribe((article)=>this.article=article)
      }
  }

}
