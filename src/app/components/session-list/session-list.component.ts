// session-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/interfaces/session';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
})
export class SessionListComponent implements OnInit {
  sessions: Session[] = [];
  
  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute, // Injectez ActivatedRoute ici
    private router: Router // Injectez le Router ici
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const categoryId = +params['categoryId']; // Convertit la chaîne en nombre
      this.loadSessions(categoryId);
    });
    
  }

  loadSessions(categoryId: number): void {
    this.sessionService.getSessionsByCategory(categoryId).subscribe(
      (sessions: Session[]) => {
        this.sessions = sessions;
      },
      (error) => {
        console.error('Error fetching sessions by category', error);
      }
    );
  }

  // onSessionSelected(sessionId: number): void {
  //   // Naviguez vers la route qui affiche les sessions pour la catégorie sélectionnée
  //   this.router.navigate(['/sessions/details', sessionId]);
  // }

  
}
