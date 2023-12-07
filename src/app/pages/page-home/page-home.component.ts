import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  currentImage!: SafeResourceUrl;
  

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private router: Router) {}

ngOnInit() {
    this.subscription = this.userService.userLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/category']); // Redirige vers category si l'utilisateur est connecté
      }
    });

    // Sélectionner une image aléatoire
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.currentImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.images[randomIndex]
    );
  }

   


    
  

  ngOnDestroy() {
 

    this.subscription.unsubscribe(); // Nettoyer l'abonnement
  }

 

  
}