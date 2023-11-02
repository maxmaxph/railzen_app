import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit, OnDestroy {
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
  isCurrentImageVisible: boolean = true; // Propriété pour gérer la visibilité de l'image actuelle

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.currentImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.images[this.currentIndex]
    );
    this.preloadNextImage();
    this.interval = setInterval(() => {
      this.changeImage();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  preloadNextImage() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.nextImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.images[nextIndex]
    );
  }

  changeImage() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.preloadNextImage();
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.currentImage = this.nextImage;
      this.isCurrentImageVisible = !this.isCurrentImageVisible; // Alternez la visibilité
    }, 3000);
  }
}
