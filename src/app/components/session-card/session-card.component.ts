import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Session } from 'src/app/interfaces/session';
import { SessionService } from 'src/app/services/session.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SessionCardComponent implements OnInit, OnChanges {
  @Output() favoriteChanged = new EventEmitter();
  @Input() session!: Session;
  isFavorite: boolean = false;
  selectedSession?: Session; // Ajoutez cette ligne pour stocker les détails de la session sélectionnée
  meditAudio?: string | ArrayBuffer | null;
  randomImage: string = '';
  images: string[] = [
    'diapo1.jpg',
    'diapo2.jpg',
    'diapo3.jpg',
    'diapo4.jpg',
    'diapo5.jpg',
    'diapo6.jpg',
    'diapo7.jpg',
    'diapo8.jpg',
    'diapo9.jpg',
    'diapo10.jpg',
    'diapo11.jpg',
    'diapo12.jpg',
    'diapo13.jpg',
    'diapo14.jpg',
    'diapo15.jpg',
    'diapo16.jpg',
    'diapo17.jpg',
    'diapo18.jpg',
    'diapo19.jpg',
    'diapo20.jpg',
    'diapo21.jpg',
    'diapo22.jpg',
    'diapo23.jpg',
    'diapo24.jpg',
    'diapo25.jpg',
    'diapo26.jpg',
    'diapo27.jpg',
    'diapo28.jpg',
    'diapo29.jpg',
    'diapo30.jpg',
    'diapo31.jpg',
    'diapo32.jpg',
    'diapo33.jpg',
    'diapo34.jpg',
    'diapo35.jpg',
    'diapo36.jpg',
    'diapo37.jpg',
    'diapo38.jpg',
    'diapo39.jpg',
    'diapo40.jpg',
    'diapo41.jpg',
    'diapo42.jpg',
    'diapo43.jpg',
    'diapo44.jpg',
    'diapo45.jpg',
    'diapo46.jpg',
    'diapo47.jpg',
    'diapo48.jpg',
    'diapo49.jpg',
    'diapo50.jpg',
    'diapo51.jpg',
    'diapo52.jpg',
    'diapo53.jpg',
    'diapo54.jpg',
    'diapo55.jpg',
    'diapo56.jpg',
    'diapo57.jpg',
    'diapo58.jpg',
    'diapo59.jpg',
    'diapo60.jpg',
    'diapo61.jpg',
    'diapo62.jpg',
    'diapo63.jpg',
    'diapo64.jpg',
    'diapo65.jpg',
    'diapo66.jpg',
  ];
  currentImageIndex: number = 0;
  nextImage: string = '';
  isTransitioning: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    private sessionService: SessionService,
    private route: ActivatedRoute
  ) {}
  checkIfFavorite() {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (userId && this.session) {
      this.favoriteService
        .isFavorite(userId, this.session.session_id)
        .subscribe(
          (isFavorite: boolean) => {
            this.isFavorite = isFavorite;
          },
          (error) => {
            console.error('Erreur lors de la vérification des favoris', error);
          }
        );
    }
  }
  ngOnInit(): void {
    this.setRandomImage(); // image aléatoire pour la session
    this.route.params.subscribe((params) => {
      const sessionId = +params['sessionId'];
      if (sessionId) {
        this.loadSessionDetails(sessionId);
      }
    });
    this.checkIfFavorite();
  }

  // Méthode pour définir une image aléatoire
  setRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.randomImage = `assets/img/diapo-session/${this.images[randomIndex]}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.session &&
      this.session.media_id &&
      typeof this.session.media_id === 'object' &&
      this.session.media_id.media_id
    ) {
      this.sessionService
        .getMediaBlob(this.session.media_id.media_id)
        .subscribe(
          (blob: Blob) => {
            this.createAudioFromBlob(blob);
          },
          (error) => {
            console.error('Error loading media blob', error);
          }
        );
    }
  }
  loadSessionDetails(sessionId: number): void {
    this.sessionService.getSessionById(sessionId).subscribe(
      (session: Session) => {
        this.session = session;
        if (session.media_id && session.media_id.media_id) {
          this.loadMedia(session.media_id.media_id);
        }
      },
      (error) => {
        console.error('Error fetching session details', error);
      }
    );
  }

  loadMedia(mediaId: number): void {
    this.sessionService.getMediaBlob(mediaId).subscribe(
      (blob: Blob) => {
        this.createAudioFromBlob(blob);
      },
      (error) => {
        console.error('Error loading media blob', error);
      }
    );
  }

  createAudioFromBlob(audioBlob: Blob): void {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
      this.meditAudio = reader.result; // Ceci est utilisé comme source dans l'élément <audio>
    };
  }

  // Ajouter une session aux favoris
  addFavorites(sessionId: number) {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (!userId) {
      console.error('ID utilisateur non trouvé dans localStorage');
      return;
    }
    this.favoriteService.addToFavorites(userId, sessionId).subscribe(
      (response) => console.log('Ajouté aux favoris avec succès', response),
      (error) => console.error("Erreur lors de l'ajout aux favoris", error)
    );
  }
  // Méthode pour basculer l'état des favoris
  toggleFavorite() {
    const sessionId = this.session.session_id;
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    

    if (!userId) {
      console.error('ID utilisateur non trouvé dans localStorage');
      return;
    }

    if (this.isFavorite) {
      // Supprimer des favoris
      this.favoriteService.removeFromFavorites(userId, sessionId).subscribe(
        () => {
          console.log('Enlevé des favoris avec succès');
          this.isFavorite = false;
          this.favoriteService.refreshFavorites(userId);
          this.favoriteChanged.emit();
          console.log(
            'Current isFavorite state before toggle:',
            this.isFavorite
          ); // État actuel avant basculement
        },
        (error) => console.error('Erreur lors du retrait des favoris', error)
      );
    } else {
      // Ajouter aux favoris
      this.favoriteService.addToFavorites(userId, sessionId).subscribe(
        () => {
          console.log('Ajouté aux favoris avec succès');
          this.isFavorite = true;
          this.favoriteService.refreshFavorites(userId);
          this.favoriteChanged.emit();
          console.log(
            'Current isFavorite state after toggle:',
            this.isFavorite
          ); // État actuel après basculement
        },
        (error) => console.error("Erreur lors de l'ajout aux favoris", error)
      );
    }

    console.log('Current isFavorite state after toggle:', this.isFavorite); // État actuel après basculement
  }
}