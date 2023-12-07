import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../interfaces/session';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private bddUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getAllSession(): Observable<Session[]> {
    return this.http.get<Session[]>(
      `${this.bddUrl}/sessions`,
      this.getHttpOptions()
    );
  }

  getSessionById(id: number): Observable<Session> {
    return this.http.get<Session>(
      `${this.bddUrl}/sessions/${id}`,
      this.getHttpOptions()
    );
  }

  getMediaBlob(mediaId: number): Observable<Blob> {
    return this.http.get(`${this.bddUrl}/medias/${mediaId}`, {
      ...this.getHttpOptions(),
      responseType: 'blob',
    });
  }

  addSession(session: any): Observable<any> {
      return this.http.post<Session>(
      `${this.bddUrl}/sessions`,
      session,
      this.getHttpOptions()
    );
  }

  getSessionByUserId(userId: number): Observable<Session[]> {
    return this.http.get<Session[]>(
      `${this.bddUrl}/sessions/user/${userId}`,
      this.getHttpOptions()
    );
  }

  // Méthode pour récupérer les sessions par ID de catégorie
  getSessionsByCategory(categoryId: number): Observable<Session[]> {
    return this.http.get<Session[]>(
      `${this.bddUrl}/sessions/category/${categoryId}`,
      this.getHttpOptions()
    );
  }

  updateSession(id: number, meditation: Session): Observable<Session> {
    return this.http.patch<Session>(
      `${this.bddUrl}/sessions/${id}`,
      meditation,
      this.getHttpOptions()
    );
  }

  deleteSession(id: number): Observable<any> {
    return this.http.delete(
      `${this.bddUrl}/sessions/${id}`,
      this.getHttpOptions()
    );
  }
}
