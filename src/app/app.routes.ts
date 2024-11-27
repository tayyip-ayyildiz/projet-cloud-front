import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { NgModule } from '@angular/core';
import { EditArticleComponent } from './edit-article/edit-article.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'article/:id', component: ArticlesComponent},
    { path: 'edit-article/:id', component: EditArticleComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],  // Ajoutez vos routes avec forRoot()
    exports: [RouterModule],  // Exporte RouterModule pour qu'il soit accessible dans le module principal
  })
  export class AppRoutes {}
