import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/interfaces/session';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css'],
})
export class PageUserComponent implements OnInit {
  user: User | null = null;
  favoriteSessions: Session[] = [];
  private favoritesSubscription: Subscription | null = null;

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      (userData: User) => {
        this.user = userData;
        // user_id est défini avant de continuer
        if (this.user && this.user.user_id !== undefined) {
          this.subscribeToFavorites();
        } else {
          console.error('user_id est undefined');
        }
      },
      (error) => {
        this.errorService.displayError(
          'Erreur lors de la récupération des données utilisateur:'
        );
      }
    );
  }

  getInitials(): string {
    if (this.user && this.user.first_name && this.user.last_name) {
      return `${this.user.first_name
        .charAt(0)
        .toUpperCase()}${this.user.last_name.charAt(0).toUpperCase()}`;
    }
    return '';
  }

  logout(): void {
    this.userService.logout();
  }

  confirmDelete(): void {
    // Open a confirmation modal

    if (confirm('Êtes-vous sûr de vouloir supprimer votre profil ?')) {
      // Check if the user_id property is defined
      if (this.user && this.user.user_id !== undefined) {
        // Call the deleteProfile() method and pass the user ID as a parameter
        this.deleteProfile(this.user.user_id);
      } else {
        // Display an error message
        console.error('user_id est undefined');
      }
    }
  }

  deleteProfile(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log('Compte supprimé avec succès');
        localStorage.clear();
        this.router.navigate(['/connect']);
      },
      error: (error) => {
        // Display an error message
      },
    });
  }

  // Méthode pour charger les sessions favorites
  subscribeToFavorites(): void {
    // Vérifier si l'utilisateur est non null et que user_id est défini
    if (this.user && this.user.user_id !== undefined) {
      const userId = this.user.user_id;

      if (this.favoritesSubscription) {
        this.favoritesSubscription.unsubscribe(); // Se désabonner de l'abonnement précédent
      }

      this.favoritesSubscription = this.favoriteService.favorites$.subscribe(
        (favorites) => {
          console.log('Subscribed favorites:', favorites);
          this.favoriteSessions = favorites;
          this.cd.markForCheck(); // Demander la vérification des changements pour ce composant
          this.cd.detectChanges();
        },
        (error) =>
          console.error("Erreur lors de l'abonnement aux favoris:", error)
      );

      this.favoriteService.refreshFavorites(userId); // Rafraîchir les favoris
      this.cd.markForCheck(); // Demander la vérification des changements pour ce composant
      this.cd.detectChanges();
    } else {
      console.error('user est null ou user_id est undefined');
    }
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe(); // Désabonnement lors de la destruction du composant
    }
  }
}
