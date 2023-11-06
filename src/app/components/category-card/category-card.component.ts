import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Session } from 'src/app/interfaces/session';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent {
  @Input()
  imageUrl!: string;

  constructor(private sessionService: SessionService) {}

  @Input() category!: Category;
  @Input() isAlternate!: boolean; // Cette propriété détermine le style de la carte
  @Output() categorySelected = new EventEmitter<number>();

  onCategorySelected(categoryId: number): void {
    this.categorySelected.emit(categoryId);
  }
}