import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
 
  public navbarOpacityClass = 'opacity-85';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = 100;
    if (window.pageYOffset > threshold) {
      this.navbarOpacityClass = 'opacity-100';
    } else {
      this.navbarOpacityClass = 'opacity-95';
    }
  }


}

