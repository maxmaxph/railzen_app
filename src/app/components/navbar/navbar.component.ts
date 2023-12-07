import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Collapse } from 'flowbite';
import { Category } from 'src/app/interfaces/category';
import { User } from 'src/app/interfaces/user';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false; // déclare la propriété isLoggedIn
  userRole: string | null = null; // déclare la propriété userRole
  user: User | null = null;
  categories: Category[] = [];
  private isMenuOpen: boolean = false;
  private collapseInstance: Collapse | null = null;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  public navbarOpacityClass = 'opacity-85';
 

  ngOnInit(): void {
    this.userService.initializeUserState();
   
    this.userService.userLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userService.getCurrentUser().subscribe((userData: User) => {
          this.user = userData;
          this.changeDetectorRef.detectChanges(); // Force la mise à jour de l'interface utilisateur
        });
      }
    });
 this.categoryService.getCategory().subscribe((categories) => {
   this.categories = categories;
   this.changeDetectorRef.detectChanges();
 });
    this.userService.userRole$.subscribe((role) => {
      this.userRole = role;
      this.changeDetectorRef.detectChanges();
    });
    this.userService.getCurrentUser().subscribe((userData: User) => {
      this.user = userData;
      this.changeDetectorRef.detectChanges();
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
  getInitials(): string {
    if (this.user && this.user.first_name && this.user.last_name) {
      return `${this.user.first_name
        .charAt(0)
        .toUpperCase()}${this.user.last_name.charAt(0).toUpperCase()}`;
    }
    return '';
  }
}

