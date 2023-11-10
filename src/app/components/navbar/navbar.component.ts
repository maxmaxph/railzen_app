import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false; // déclare la propriété isLoggedIn
  userRole: string | null = null; // déclare la propriété userRole

  constructor(private userService: UserService) {}
  public navbarOpacityClass = 'opacity-85';

  ngOnInit(): void {
    this.userService.initializeUserState();
    this.userService.userLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.userService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = 100;
    if (window.pageYOffset > threshold) {
      this.navbarOpacityClass = 'opacity-100';
    } else {
      this.navbarOpacityClass = 'opacity-95';
    }
  }
  logout(): void {
    this.userService.logout();
  }
}

