import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
 imports: [RouterModule, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
 changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavbarComponent {
    username$ = this.auth.user$;
    constructor(private auth: AuthService) {

        }

 ngOnInit() {}


  isScrolled = false;
  menuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
