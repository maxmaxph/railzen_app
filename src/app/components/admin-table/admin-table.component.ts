import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Session } from 'src/app/interfaces/session';
import { User } from 'src/app/interfaces/user';
import { CategoryService } from 'src/app/services/category.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
})
export class AdminTableComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() sessions: Session[] = [];
  @Input() categories: Category[] = [];
  isModalVisible: boolean = false;
  deletedEntityType: string = '';
  editingUserId: number | null = null;
  editingSessionId: number | null = null;
  editingCategoryId: number | null = null;
  isConfirmationModalVisible: boolean = false;
  confirmationModalTitle: string = '';
  confirmationModalMessage: string = '';
  confirmationAction: () => void = () => {}; // Initialisation avec une fonction vide

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.sessionService
      .getAllSession()
      .subscribe((sessions) => (this.sessions = sessions));
    this.userService.getAllUsers().subscribe((users) => (this.users = users));
    this.categoryService
      .getCategory()
      .subscribe((categories) => (this.categories = categories));
  }

  // Méthode pour ouvrir la modale de confirmation
  openConfirmationModal(
    title: string,
    message: string,
    action: () => void
  ): void {
    this.confirmationModalTitle = title;
    this.confirmationModalMessage = message;
    this.confirmationAction = action;
    this.isConfirmationModalVisible = true;
  }

  // Méthode pour confirmer l'action
  confirmModalAction(): void {
    if (this.confirmationAction) {
      this.confirmationAction();
    }
    this.isConfirmationModalVisible = false;
  }

  // Méthode pour fermer la modale de confirmation
  closeConfirmationModal(): void {
    this.isConfirmationModalVisible = false;
  }

  // Méthodes pour demander une confirmation avant suppression
  requestDeleteUser(userId: number): void {
    this.openConfirmationModal(
      "Suppression d'utilisateur",
      'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      () => this.deleteUser(userId)
    );
  }

  requestDeleteSession(sessionId: number): void {
    this.openConfirmationModal(
      'Suppression de séance',
      'Êtes-vous sûr de vouloir supprimer cette séance ?',
      () => this.deleteSession(sessionId)
    );
  }

  requestDeleteCategory(categoryId: number): void {
    this.openConfirmationModal(
      'Suppression de catégorie',
      'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
      () => this.deleteCategory(categoryId)
    );
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
  editUser(userId: number): void {
    this.editingUserId = userId;
  }

  saveUser(user: User): void {
    this.userService.updateUser(user).subscribe({
      next: (updatedUser) => {
        // Mettre à jour l'utilisateur dans la liste des utilisateurs
        const index = this.users.findIndex(
          (u) => u.user_id === updatedUser.user_id
        );
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.editingUserId = null;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l’utilisateur', error);
      },
    });
  }

  cancelEdit(): void {
    this.editingUserId = null;
    // Vous pouvez également recharger les utilisateurs ici si vous voulez annuler les modifications non sauvegardées
  }

  // Méthode pour commencer à éditer une session
  editSession(sessionId: number): void {
    this.editingSessionId = sessionId;
  }

  // Méthode pour sauvegarder les modifications d'une session
  saveSession(session: Session): void {
    if (this.editingSessionId === null) {
      console.error(
        'Erreur : Aucune session n’est sélectionnée pour la mise à jour'
      );
      return;
    }

    this.sessionService
      .updateSession(this.editingSessionId, session)
      .subscribe({
        next: (updatedSession) => {
          // Mettre à jour la session dans la liste des sessions
          const index = this.sessions.findIndex(
            (s) => s.session_id === updatedSession.session_id
          );
          if (index !== -1) {
            this.sessions[index] = updatedSession;
          }
          this.editingSessionId = null;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la session', error);
        },
      });
  }

  // Méthode pour annuler l'édition d'une session
  cancelEditSession(): void {
    this.editingSessionId = null;
    // Vous pouvez également recharger les sessions ici si vous voulez annuler les modifications non sauvegardées
  }

  // Méthode pour supprimer une session
  deleteSession(sessionId: number): void {
    this.sessionService.deleteSession(sessionId).subscribe({
      next: () => {
        this.deletedEntityType = 'session';
        this.isModalVisible = true; // Affiche la modal
        // Mettre à jour la liste des sessions après la suppression
        this.sessions = this.sessions.filter(
          (session) => session.session_id !== sessionId
        );
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la session', error);
      },
    });
  }
  // Category methods
  editCategory(categoryId: number): void {
    this.editingCategoryId = categoryId;
  }

  saveCategory(category: Category): void {
    this.categoryService.updateCategory(category).subscribe({
      next: (updatedCategory) => {
        const index = this.categories.findIndex(
          (c) => c.category_id === updatedCategory.category_id
        );
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
        this.editingCategoryId = null;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la catégorie', error);
      },
    });
  }

  cancelEditCategory(): void {
    this.editingCategoryId = null;
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.deletedEntityType = 'category';
        this.isModalVisible = true;
        this.categories = this.categories.filter(
          (c) => c.category_id !== categoryId
        );
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la catégorie', error);
      },
    });
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
