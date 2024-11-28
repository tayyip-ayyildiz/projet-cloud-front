import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArticlesServiceService } from '../articles-service.service';
import { Article } from '../entity/Article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
  imports: [RouterModule, FormsModule,ReactiveFormsModule]
})
export class EditArticleComponent implements OnInit {
  editArticleForm!: FormGroup;
  article: Article = {
    id: '',
    name: '',
    description: '',
    image: ''
  };
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticlesServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.article.id = id;
      this.loadArticle(id);
    }

    this.editArticleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', [Validators.required]]
    });
  }

  loadArticle(id: string): void {
    this.articleService.getArticleFromId(id).subscribe({
      next: (data) => {
        this.article = data;
        this.editArticleForm.patchValue({
          name: this.article.name,
          description: this.article.description,
          image: this.article.image
        });
      },
      error: (err) => console.error('Erreur lors du chargement de l\'article:', err)
    });
  }

  update(): void {
    if (this.editArticleForm.valid) {
      const { name, description, image } = this.editArticleForm.value;

      if (this.article.id) {
        if (name.length !== 0 && description.length !== 0 && image.length !== 0) {
          this.article.name = name;
          this.article.description = description;
          this.article.image = image;

          this.articleService.modifyArticle(this.article).subscribe({
            next: () => {
              console.log('Article mis à jour avec succès.');
              this.router.navigate(['/article', this.article.id]); // Redirection après mise à jour
            },
            error: (err) => {
              console.error('Erreur lors de la mise à jour de l\'article :', err);
              this.message = 'Erreur lors de la mise à jour.';
            }
          });
        } else {
          console.error('Les champs ne peuvent pas être vides.');
        }
      } else {
        console.error('ID de l\'article non défini.');
      }
    } else {
      console.error('Formulaire invalide.');
      this.message = 'Veuillez remplir correctement tous les champs.';
    }
  }
}
