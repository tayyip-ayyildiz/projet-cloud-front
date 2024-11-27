import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importer CommonModule
import { RouterModule } from '@angular/router';  // Importer RouterModule si nécessaire

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corriger ici pour utiliser styleUrls
  imports: [RouterOutlet, CommonModule, RouterModule], // Ajoutez CommonModule et RouterModule ici
})
export class AppComponent {
  title = 'projet-cloud-front';
}