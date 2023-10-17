import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/api/sessions'; // Remplacez par l'URL de votre back-end

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer une requête POST pour créer une session
  createSession(sessionData: any): Observable<any> {
    return this.http.post(this.apiUrl, sessionData);
  }

  // Méthode pour envoyer une requête GET pour récupérer toutes les sessions
  getSessions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Autres méthodes pour mettre à jour et supprimer des sessions
}
