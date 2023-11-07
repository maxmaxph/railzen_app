import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { Token } from '../interfaces/token';
import jwt_decode from 'jwt-decode'; // Assurez-vous d'avoir installé jwt-decode

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable();

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
      })
    );
  }

  subscribe(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.url}auth/register`, user).pipe(
      tap((tokenResponse: Token) => {
        const token = tokenResponse.accessToken;
        const decodedToken = jwt_decode(token) as any;
        localStorage.setItem('userId', decodedToken.userId);
        localStorage.setItem('token', token);
        this.setLoggedIn(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.setLoggedIn(false);
    this.router.navigate(['/home']);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}user`, this.getHttpOptions());
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(
      `${this.url}user/${id}`,
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
}
