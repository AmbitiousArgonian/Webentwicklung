import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ChatWidgetComponent } from './shared/chat-widget/chat-widget.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatWidgetComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userRole: string | null = null;
  hideChat = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:8000/api/session', {
      withCredentials: true
    }).subscribe({
      next: (res) => {
        this.userRole = res.role ?? null;
        this.updateChatVisibility(this.router.url);
      },
      error: () => {
        this.userRole = null;
        this.updateChatVisibility(this.router.url);
      }
    });

    this.updateChatVisibility(this.router.url);

    this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        this.updateChatVisibility(event.urlAfterRedirects);
      });
  }

  private updateChatVisibility(url: string) {
  const isHiddenRoute =
    url.startsWith('/login') ||
    url.startsWith('/register') ||
    url.startsWith('/dashboard');

  const isAdmin = this.userRole === 'admin';

  this.hideChat = isHiddenRoute || isAdmin;
}
}