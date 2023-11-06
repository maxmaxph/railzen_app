import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url, this.getHttpOptions()).pipe(
      map((categories) =>
        categories.map((category) => ({
          ...category,
          imageUrl: this.getImageForCategory(category),
        }))
      )
    );
  }

  private getImageForCategory(category: Category): string {
    const images: { [key: number]: string } = {
      2: 'assets/img/img_category/atteinte.jpg',
      3: 'assets/img/img_category/pression.jpg',
      4: 'assets/img/img_category/sommeil.jpg',
      5: 'assets/img/img_category/urgence.jpg',
      6: 'assets/img/img_category/changement.jpg',
      7: 'assets/img/img_category/detente.jpg',
    };

    return images[category.category_id] || 'assets/img/img_category/detente.jpg';
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`, this.getHttpOptions());
  }
}
