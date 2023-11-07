import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Session } from 'src/app/interfaces/session';
import { User } from 'src/app/interfaces/user';
import { CategoryService } from 'src/app/services/category.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { registerLocaleData } from '@angular/common';
@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class AdminTableComponent implements OnInit {
  @Input()
  users: User[] = [];
  sessions: Session[] = [];
  categories: Category[] = [];
  isModalVisible: boolean = false;
  deletedEntityType: string = '';

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.sessionService
      .getAllSession()
      .subscribe((sessions) => (this.sessions = sessions));
    this.userService.getAllUsers().subscribe((users) => (this.users = users));
    this.categoryService
      .getCategory()
      .subscribe((categories) => (this.categories = categories));
  }
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.deletedEntityType = 'user';
        this.isModalVisible = true; // Affiche la modal
        // Mettre à jour la liste des utilisateurs après la suppression
        this.users = this.users.filter((user) => user.user_id !== id);
      },
      error: (error) => {
        console.error('Erreur lors du soft delete', error);
      },
    });
  }

  deleteSession(id: number): void {
    this.sessionService.deleteSession(id).subscribe(
      () => {
        this.deletedEntityType = 'session';
        this.isModalVisible = true; // Affiche la modal
        this.sessions = this.sessions.filter(
          (session) => session.session_id !== id
        );
      },
      (error) =>
        console.error('Erreur lors de la suppression de la session', error)
    );
  }
  // Dans votre composant TypeScript
  getCategoryNameById(categoryId: number): string {
    const category = this.categories.find((c) => c.category_id === categoryId);
    return category ? category.name : 'Catégorie inconnue';
  }

  // Fonction pour ouvrir la modal
  showModal() {
    this.isModalVisible = true;
  }

  // Fonction pour fermer la modal
  closeModal() {
    this.isModalVisible = false;
  }
}
