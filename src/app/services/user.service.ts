import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Token } from '../interfaces/token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable(); //  Observable abonnements

  constructor(private readonly http: HttpClient, private router: Router) {}
  url: string = `http://localhost:3000/api/`;

  // 1 - déclaration d'un behaviour subject (init à false) pour transmettre un booléen (true si connecté)

  loginUser(user: User): Observable<Token> {
    // On envoie l'utilisateur au serveur
    return this.http.post<Token>(`${this.url}auth/login`, user);
  }

  subscribe(user: User): Observable<User> {
    // On envoie l'utilisateur au serveur
    return this.http.post<User>(`${this.url}auth/register`, user);
  }

  logout(): void {
    // je supprime le token de l'espace de stockage
    localStorage.removeItem('token');

    // je redirige l'usager vers la page de connexion ou la page d'accueil
    this.router.navigate(['/login']);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}user`);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}user/${id}`);
  }

  setLoggedIn(value: boolean): void {
    this.userLoggedIn.next(value);
  }
}
