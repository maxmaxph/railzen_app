// category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router // Injectez le Router ici
  ) {}

  ngOnInit() {
    this.categoryService.getCategory().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onCategorySelected(categoryId: number): void {
    // Naviguez vers la route qui affiche les sessions pour la catégorie sélectionnée
    this.router.navigate(['/sessions', categoryId]);
  }
}
