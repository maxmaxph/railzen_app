import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit, OnDestroy {
  isNavbarVisible: boolean = false;
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

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      // Une fois le délai écoulé, naviguez vers la page principale
      this.router.navigate(['/home']); // Remplacez '/home' par le chemin de votre page principale
    }, 2000);

    // Afficher la première image immédiatement
    this.currentImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.images[this.currentIndex]
    );

    // Précharger la deuxième image (nextImage)
    this.preloadNextImage();

    // Démarrez l'intervalle pour changer les images toutes les 5 secondes (5000 ms)
    this.interval = setInterval(() => {
      this.changeImage();
    }, 5000); // Vous pouvez ajuster l'interval ici
  }

  ngOnDestroy() {
    // Assurez-vous d'effacer l'intervalle lorsque le composant est détruit pour éviter les fuites de mémoire
    clearInterval(this.interval);
  }

  preloadNextImage() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.nextImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.images[nextIndex]
    );
  }

  changeImage() {
    // Appliquer un fondu enchaîné en modifiant progressivement l'opacité
    const nextIndex = (this.currentIndex + 1) % this.images.length;

    // Précharger l'image suivante
    this.preloadNextImage();

    // Changer l'image actuelle avec une transition de fondu
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.currentImage = this.nextImage;
    }, 500); // Temps de transition en millisecondes (ajustez selon vos besoins)
  }
}