import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';

private userSubject = new BehaviorSubject<string | null>(null);
user$ = this.userSubject.asObservable();

//  constructor(private http: HttpClient, private router: Router) {}
 constructor(private http: HttpClient) {}



/*   login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true })
     // .pipe(tap(() => this.router.navigate(['/'])));
  } */

 login(email: string, password: string) {
     return this.http.post<any>(`${this.baseUrl}/login`, { email, password },
         { withCredentials: true }) .pipe(
             tap(res => { this.userSubject.next(res.name);
                 localStorage.setItem('username', res.name); }) );
                 }
                  loadUserFromStorage() {
                     const saved = localStorage.getItem('username');
     if (saved) this.userSubject.next(saved); }


register(name: string, email: string, password: string) {
  return this.http.post(`${this.baseUrl}/register`, { name, email, password }, { withCredentials: true })
   // .pipe(tap(() => {}));
}


  /* logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
    //  .pipe(tap(() => this.router.navigate(['/login'])));
  } */
//  checkSession() { return this.http.get( `${this.baseUrl}/session`, { withCredentials: true } ); }

logout() { return this.http.post(`${this.baseUrl}/logout`, {},
    { withCredentials: true }) .pipe( tap(() => {
    this.userSubject.next(null); localStorage.removeItem('username'); }) ); }

 checkSession() { return this.http.get<any>(`${this.baseUrl}/session`,
     { withCredentials: true })
     .pipe( tap(res => { if (res.loggedIn)
         { this.userSubject.next(res.name);
     localStorage.setItem('username', res.name); } }) ); }

   getHome() {
    return this.http.get<{ message: string; time: string }>(`${this.baseUrl}/home`, { withCredentials: true });
  }
}
