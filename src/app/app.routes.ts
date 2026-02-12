import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { racingComponent } from './pages/racing/racing.component';
import { HomeComponent } from './pages/home/home.component';
import { goldenComponent } from './pages/golden/golden.component';



export const routes: Routes = [
  // Startseite soll home sein
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'},

  // Home-Seite
  { path: 'home',
    component: HomeComponent },

  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },

  // Themen-Apartments
  { path: 'martini-racing', component: racingComponent },
  { path: 'golden-twenties', component: goldenComponent },

  { path: '**', redirectTo: 'login' } // Hier wird die 404 Seite verlinkt
];

