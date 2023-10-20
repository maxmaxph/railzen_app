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

  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('access_token');
  //   let headers = new HttpHeaders();
  //   if (token) {
  //     headers = headers.set('Authorization', 'Bearer ' + token);
  //   }
  //   return headers;
  // }

  getAllSession(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.bddUrl}/sessions`, );
  }

  getSessionById(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.bddUrl}/sessions/${id}`, );
  }

  getMediaUrl(mediaId: number): string {
    return `${this.bddUrl}/media/${mediaId}`;
  }

  addSession(session: any): Observable<any> {
    console.log('MEDITATION ENVOYER', session);
    const token = localStorage.getItem('token')
    return this.http.post<Session>(`${this.bddUrl}/sessions`, session, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getSessionByUserId(userId: number): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.bddUrl}/sessions/user/${userId}`,);
  }

  updateMeditation(id: number, meditation: Session): Observable<Session> {
    return this.http.patch<Session>(
      `${this.bddUrl}/sessions/${id}`,
      meditation
    );
  }

  deleteSession(id: number): Observable<any> {
    return this.http.delete(`${this.bddUrl}/sessions/${id}`, );
  }
}
