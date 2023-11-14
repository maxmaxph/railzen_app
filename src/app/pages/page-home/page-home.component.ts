import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;

  images: string[] = [
    './assets/controleuse.svg',
    './assets/bureau.svg',
    './assets/materiel.svg',
    './assets/rh.svg',
  ];

  currentIndex: number = 0;
  currentImage: any;
  nextImage: any;
  interval: any;

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {
this.subscription = this.userService.userLoggedIn$.subscribe((loggedIn) => {
  if (loggedIn) {
    this.router.navigate(['/category']); // Redirige vers category si l'utilisateur est connecté
  }
});

    

    //  première image immédiatement
    this.currentImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.images[this.currentIndex]
    );

    //la deuxième image (nextImage)
    this.preloadNextImage();

    // intervalle pour changer les images
    this.interval = setInterval(() => {
      this.changeImage();
    }, 5000);
  }

  ngOnDestroy() {
    //  composant est détruit pour éviter les fuites de mémoire
    clearInterval(this.interval);

    this.subscription.unsubscribe(); // Nettoyer l'abonnement
  }

  preloadNextImage() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.nextImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.images[nextIndex]
    );
  }

  changeImage() {
    // fondu enchaîné en modifiant progressivement l'opacité
    const nextIndex = (this.currentIndex + 1) % this.images.length;

    // Précharg l'image suivante
    this.preloadNextImage();

    // Change l'image actuelle avec  fondu
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.currentImage = this.nextImage;
    }, 1000);
  }
}