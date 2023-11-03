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
    return this.http.get<Session>(`${this.bddUrl}/sessions/${id}`,this.getHttpOptions());
  }

  getMediaUrl(mediaId: number): string {
    return `${this.bddUrl}/media/${mediaId}`;
  }

  addSession(session: any): Observable<any> {
    console.log('MEDITATION ENVOYER', session);
    const token = localStorage.getItem('token');
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
