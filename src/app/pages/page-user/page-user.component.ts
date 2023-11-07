import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css'],
})
export class PageUserComponent implements OnInit {
  user: User | null = null;
  router: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Supposons que vous avez une méthode pour obtenir l'utilisateur actuellement connecté
    this.userService.getCurrentUser().subscribe(
      (userData: User) => {
        this.user = userData;
      },
      (error: any) => {
        console.error('Error fetching user data', error);
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
    // Ici, vous pouvez ouvrir un modal de confirmation avant de supprimer
    if (confirm('Êtes-vous sûr de vouloir supprimer votre profil ?')) {
      this.deleteProfile();
    }
  }

  deleteProfile(): void {
       const userId = +localStorage.getItem('user_id')!;
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log('Compte supprimé avec succès');
        localStorage.clear();
        this.router.navigate(['/first']);
             },
      error: (error) => {
        console.error('Erreur lors de la suppression du compte', error);
      }
    });
  }
  
}