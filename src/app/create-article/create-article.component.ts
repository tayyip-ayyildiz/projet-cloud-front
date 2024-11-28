import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Article } from '../entity/Article';
import { ArticlesServiceService } from '../articles-service.service';

@Component({
  selector: 'app-create-article',
  imports: [RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent implements OnInit {

  createArticleForm!:FormGroup
  article: Article = {
    id: '',
    name: '',
    description: '',
    image: ''
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticlesServiceService,
    private router: Router
  ) {}

  create(){

    if(this.createArticleForm.valid){
      const { name, description, image } = this.createArticleForm.value;

      if (name.length !== 0 && description.length !== 0 && image.length !== 0) {
        this.article.name = name;
        this.article.description = description;
        this.article.image = image;

        this.articleService.createArticle(this.article).subscribe({
          next: () => {
            console.log('Article crée.');
            this.router.navigate(['/']); // Redirection après mise à jour
          },
          error: (err) => {
            console.error('Erreur lors de la création de l\'article :', err);
          }
        });
      } else {
        console.error('Les champs ne peuvent pas être vides.');
      }
    } 
    else {
      console.error('Formulaire invalide.');
    }



    }

  ngOnInit(): void {
      
    this.createArticleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', [Validators.required]]
    });

  }



}
