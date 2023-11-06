import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Session } from 'src/app/interfaces/session';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.css'],
})
export class SessionCardComponent implements OnInit, OnChanges {
  @Input() session!: Session;
  mediaUrl?: string;
  randomImage: string = '';
  images: string[] = [
    'diapo1.jpg','diapo2.jpg','diapo3.jpg','diapo4.jpg','diapo5.jpg','diapo6.jpg','diapo7.jpg','diapo8.jpg','diapo9.jpg','diapo10.jpg','diapo11.jpg','diapo12.jpg','diapo13.jpg','diapo14.jpg','diapo15.jpg','diapo16.jpg','diapo17.jpg','diapo18.jpg','diapo19.jpg','diapo20.jpg','diapo21.jpg','diapo22.jpg','diapo23.jpg','diapo24.jpg','diapo25.jpg','diapo26.jpg','diapo27.jpg','diapo28.jpg','diapo29.jpg','diapo30.jpg','diapo31.jpg','diapo32.jpg','diapo33.jpg','diapo34.jpg','diapo35.jpg','diapo36.jpg','diapo37.jpg','diapo38.jpg','diapo39.jpg','diapo40.jpg','diapo41.jpg','diapo42.jpg','diapo43.jpg','diapo44.jpg','diapo45.jpg','diapo46.jpg','diapo47.jpg','diapo48.jpg','diapo49.jpg','diapo50.jpg','diapo51.jpg','diapo52.jpg','diapo53.jpg','diapo54.jpg','diapo55.jpg','diapo56.jpg','diapo57.jpg','diapo58.jpg','diapo59.jpg','diapo60.jpg','diapo61.jpg','diapo62.jpg','diapo63.jpg','diapo64.jpg','diapo65.jpg','diapo66.jpg'

  ];
  currentImageIndex: number = 0;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.setRandomImage();
    setInterval(() => this.setRandomImage(), 10000); // Change l'image toutes les 10 secondes
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.session &&
      this.session.media_id &&
      typeof this.session.media_id === 'number'
    ) {
      this.mediaUrl = this.sessionService.getMediaUrl(this.session.media_id);
    }
  }

  setRandomImage(): void {
    // Incrémente l'index et revient à 0 si nécessaire
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.randomImage = `assets/img/diapo-session/${
      this.images[this.currentImageIndex]
    }`;
  }
}
