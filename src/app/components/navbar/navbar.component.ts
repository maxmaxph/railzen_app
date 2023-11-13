import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Collapse } from 'flowbite';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false; // déclare la propriété isLoggedIn
  userRole: string | null = null; // déclare la propriété userRole
  user: User | null = null;
  private collapseInstance: Collapse | null = null;

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  public navbarOpacityClass = 'opacity-85';
  ngAfterViewInit(): void {
    const targetEl = document.getElementById('navbar-hamburger') as HTMLElement;
    const triggerEl = document.querySelector(
      '[data-collapse-toggle="navbar-hamburger"]'
    ) as HTMLElement;

    if (targetEl && triggerEl) {
      this.collapseInstance = new Collapse(targetEl, triggerEl, {
        onCollapse: () => console.log('Collapsed'),
        onExpand: () => console.log('Expanded'),
        onToggle: () => console.log('Toggled'),
      });
    }
  }

  ngOnInit(): void {
    this.userService.initializeUserState();
    this.userService.userLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.userService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
    this.userService.getCurrentUser().subscribe((userData: User) => {
      this.user = userData;
      this.changeDetectorRef.markForCheck();
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

  closeMenu(): void {
    if (this.collapseInstance) {
      this.collapseInstance.collapse();
    }
  }

  toggleMenu(): void {
    if (this.collapseInstance) {
      this.collapseInstance.toggle();
    }
  }
  logout(): void {
    this.userService.logout();
  }
  getInitials(): string {
    if (this.user && this.user.first_name && this.user.last_name) {
      return `${this.user.first_name
        .charAt(0)
        .toUpperCase()}${this.user.last_name.charAt(0).toUpperCase()}`;
    }
    return '';
  }
}

