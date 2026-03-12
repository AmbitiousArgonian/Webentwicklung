import {
  Component,
  HostListener,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe, CommonModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  username$ = this.auth.user$;
  userRole = '';

  bookings: any[] = [];
  loadingBookings = false;

  isScrolled = false;
  menuOpen = false;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSession();
  }

  openUserBookings(): void {
    this.loadingBookings = true;

    this.http
      .get<any[]>('http://localhost:8000/api/my-bookings?ts=' + Date.now(), {
        withCredentials: true
      })
      .subscribe({
        next: (data) => {
          this.bookings = data;
          this.loadingBookings = false;

          const modalEl = document.getElementById('userBookingModal');
          if (modalEl) {
            const modal = new Modal(modalEl);
            modal.show();
          }
        },
        error: () => {
          this.loadingBookings = false;
        }
      });
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