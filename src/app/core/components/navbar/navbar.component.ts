import { Component, HostListener, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  username$ = this.auth.user$;
  userRole = '';

  isScrolled = false;
  menuOpen = false;

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSession();
  }

  loadSession(): void {
    fetch('http://localhost:8000/api/session', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        this.userRole = data.loggedIn ? data.role : '';
        this.cdr.markForCheck();
      })
      .catch(() => {
        this.userRole = '';
        this.cdr.markForCheck();
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}