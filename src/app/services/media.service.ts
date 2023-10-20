import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Media } from '../interfaces/media';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  image: Media[] = [];
  private bddUrl = 'http://localhost:3000/api/medias';
  constructor(private http: HttpClient) {}

  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('access_token');
  //   let headers = new HttpHeaders();
  //   if (token) {
  //     headers = headers.set('Authorization', 'Bearer ' + token);
  //   }
  //   return headers;
  // }

  getMedia() {
    return this.http.get(`${this.bddUrl}`, {
      responseType: 'blob',
    });
  }

  getMediaById(id: number) {
    return this.http.get(`http://localhost:3000/api/medias/${id}`).pipe(
      tap((data) => console.log('Réponse du média:', data)),
      catchError((err) => {
        console.error('Erreur lors de la récupération du média:', err);
        throw err;
      })
    );
  }

  postMedia(formData: FormData) {
    const token = localStorage.getItem('token');
    return this.http
      .post('http://localhost:3000/api/medias', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        tap((response: any) => {
          console.log('Réponse du serveur après création du média:', response);
        })
      );
  }

  deleteMedia(id: number) {
    return this.http.delete(`http://localhost:3000/api/medias/${id}`);
  }
}
