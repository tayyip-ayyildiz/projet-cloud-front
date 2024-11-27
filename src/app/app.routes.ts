import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'article/:id', component: ArticlesComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],  // Ajoutez vos routes avec forRoot()
    exports: [RouterModule],  // Exporte RouterModule pour qu'il soit accessible dans le module principal
  })
  export class AppRoutes {}
