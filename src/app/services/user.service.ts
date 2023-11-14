import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { Token } from '../interfaces/token';
import jwt_decode from 'jwt-decode'; // Assurez-vous d'avoir installé jwt-decode

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // propriété pour stocker l'état de connexion
  private userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable();
  // propriété pour stocker le rôle de l'utilisateur
  private userRole = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRole.asObservable();

  constructor(private readonly http: HttpClient, private router: Router) {}
  url: string = `http://localhost:3000/api/`;

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  loginUser(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.url}auth/login`, user).pipe(
      tap((tokenResponse: Token) => {
        const token = tokenResponse.accessToken;
        const decodedToken = jwt_decode(token) as any; // Cast to any if you don't have a type for the decoded token
        localStorage.setItem('userId', decodedToken.userId);
        localStorage.setItem('token', token);
        this.setLoggedIn(true);
        this.userRole.next(decodedToken.roleName); // mise à jour du BehaviorSubject avec le rôle
      })
    );
  }

  subscribe(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.url}auth/register`, user).pipe(
      tap((tokenResponse: Token) => {
        // le token est présent et n'est pas vide
        if (tokenResponse && tokenResponse.accessToken) {
          try {
            const token = tokenResponse.accessToken;
            const decodedToken = jwt_decode(token) as any; // Assurez-vous que le token est valide
            localStorage.setItem('userId', decodedToken.userId);
            localStorage.setItem('token', token);
            this.setLoggedIn(true);
            this.userRole.next(decodedToken.roleName); // mise à jour du BehaviorSubject avec le rôle
          } catch (error) {
            // Gérez l'erreur de décodage ici
            console.error('Erreur lors du décodage du token:', error);
          }
        } else {
          console.error('Token non reçu ou vide');
        }
      }),
      catchError((error) => {
        // Gérez les autres erreurs ici
        console.error('Erreur lors de l’inscription:', error);
        return throwError(() => new Error('Erreur lors de l’inscription'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.userLoggedIn.next(false);
    this.userRole.next(null);
    this.setLoggedIn(false);
    this.router.navigate(['/home']);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users`, this.getHttpOptions());
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(
      `${this.url}users/${id}`,
      this.getHttpOptions()
    );
  }

  setLoggedIn(value: boolean): void {
    this.userLoggedIn.next(value);
  }

  getCurrentUser(): Observable<User> {
    const currentUserId = localStorage.getItem('userId');
    if (currentUserId) {
      return this.http.get<User>(
        `${this.url}users/${currentUserId}`,
        this.getHttpOptions()
      );
    } else {
      throw new Error('User ID not found in localStorage');
    }
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .patch<User>(
        `${this.url}users/${user.user_id}`,
        user,
        this.getHttpOptions()
      )
      .pipe(
        tap((updatedUser) => {
          console.log('Utilisateur mis à jour :', updatedUser);
        }),
        catchError((error) => {
          console.error(
            'Erreur lors de la mise à jour de l’utilisateur',
            error
          );
          return throwError(
            () => new Error('Erreur lors de la mise à jour de l’utilisateur')
          );
        })
      );
  }

  initializeUserState(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token) as any;
        const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Le token n'est pas expiré
          this.userLoggedIn.next(true);
          this.userRole.next(decodedToken.roleName);
        } else {
          // Le token est expiré
          console.error('Token expiré');
          this.logout(); // Déconnectez l'utilisateur et videz localStorage
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        this.logout(); // Déconnectez l'utilisateur et videz localStorage
      }
    } else {
      this.logout(); // Déconnectez l'utilisateur et videz localStorage si aucun token n'est trouvé
    }
  }

  isLoggedIn(): boolean {
    return this.userLoggedIn.getValue(); // Récupère la valeur actuelle du BehaviorSubject
  }

  getUserRole(): string | null {
    return this.userRole.getValue(); // Récupère la valeur actuelle du BehaviorSubject pour le rôle
  }

  updatePassword(newPassword: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.patch(
      `${this.url}users/change-password/${userId}`,
      { newPassword },
      this.getHttpOptions()
    );
  }
}
