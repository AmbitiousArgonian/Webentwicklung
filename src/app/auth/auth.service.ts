import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';

//  constructor(private http: HttpClient, private router: Router) {}
 constructor(private http: HttpClient) {}


  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true })
     // .pipe(tap(() => this.router.navigate(['/'])));
  }

register(name: string, email: string, password: string) {
  return this.http.post(`${this.baseUrl}/register`, { name, email, password }, { withCredentials: true })
   // .pipe(tap(() => {}));
}


  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
    //  .pipe(tap(() => this.router.navigate(['/login'])));
  }
 checkSession() { return this.http.get( `${this.baseUrl}/session`, { withCredentials: true } ); }

   getHome() {
    return this.http.get<{ message: string; time: string }>(`${this.baseUrl}/home`, { withCredentials: true });
  }
}
