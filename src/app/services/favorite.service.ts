import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, forkJoin, map, switchMap, tap, throwError } from 'rxjs';
import { Favorite } from '../interfaces/favorite';
import { Session } from '../interfaces/session';
@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private url = 'http://localhost:3000/api/favorites';
  private favoritesSubject = new BehaviorSubject<Session[]>([]); // Crée un BehaviorSubject pour favorites
  public favorites$ = this.favoritesSubject.asObservable(); // BehaviorSubject comme Observable
  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('token'); //  token stocké dans localStorage
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
  addToFavorites(userId: number, sessionId: number): Observable<any> {
    const url = `${this.url}/${userId}/${sessionId}`;
    return this.http.post(url, {}, this.getHttpOptions());
  }

  removeFromFavorites(userId: number, sessionId: number): Observable<any> {
    const url = `${this.url}/user/${userId}/session/${sessionId}`;
    return this.http.delete(url, this.getHttpOptions()).pipe(
      tap(() => { this.refreshFavorites(userId);}),
      catchError((error) => {
        console.error('Error removing favorite:', error);
        return throwError(() => new Error('Error removing favorite'));
      })
    );
  }
  getFavoritesByUserId(userId: number): Observable<any> {
    const url = `${this.url}/user/${userId}`;
    return this.http.get(url, this.getHttpOptions());
  }

  isFavorite(userId: number, sessionId: number): Observable<boolean> {
    return this.getFavoritesByUserId(userId).pipe(
      map((favorites: Favorite[]) => {
        return favorites.some((favorite) => favorite.session_id === sessionId);
      })
    );
  }
  getFavoriteSessionsDetails(userId: number): Observable<Session[]> {
    return this.getFavoritesByUserId(userId).pipe(
      switchMap((favorites: Favorite[]) => {
        //forkJoin pour obtenir tous les détails des sessions
        return forkJoin(
          favorites.map((favorite) =>
            this.http.get<Session>(
              `http://localhost:3000/api/sessions/${favorite.session_id}`,
              this.getHttpOptions()
            )
          )
        );
      })
    );
  }
  refreshFavorites(userId: number): void {
    if (userId !== undefined) {
      this.getFavoriteSessionsDetails(userId).subscribe((sessions) => {
        console.log(
          'Favorites before updating BehaviorSubject:',
          this.favoritesSubject.value
        );
        this.favoritesSubject.next(sessions); // Mettre à jour le BehaviorSubject
        console.log('Favorites after updating BehaviorSubject:', sessions);
      });
    } else {
      console.error(
        "L'ID de l'utilisateur est undefined lors de l'appel de refreshFavorites"
      );
    }
  }
}
