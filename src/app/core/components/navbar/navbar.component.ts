import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-navbar',
  standalone: true,
 imports: [RouterModule, NgIf, AsyncPipe, CommonModule,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
 //changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavbarComponent {
    username$ = this.auth.user$;
   constructor(
     private auth: AuthService,
     private http: HttpClient
   ) {}


 bookings: any[] = [];
  loadingBookings = false;
    openUserBookings() {
        this.loadingBookings = true;
       this.http.get<any[]>('http://localhost:8000/api/my-bookings?ts=' + Date.now(), {
         withCredentials: true
       })
 .subscribe({ next: (data) => {
                 this.bookings = data;
                  this.loadingBookings = false;
                   const modalEl = document.getElementById('userBookingModal');
                    const modal = new Modal(modalEl!);
                     modal.show(); },
                      error: () => { this.loadingBookings = false; } });
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
