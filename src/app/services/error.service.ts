import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorMessage = new BehaviorSubject<string>('');
  public errorMessage$ = this.errorMessage.asObservable();

  displayError(message: string) {
    this.errorMessage.next(message);
    // Vous pouvez également définir une logique pour afficher la modal ici
  }
}
