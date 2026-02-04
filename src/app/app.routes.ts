import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
//import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MartiniRacingComponent } from './pages/martini-racing/martini-racing.component';
import { GoldenTwentiesDetailComponent } from './golden-twenties-detail/golden-twenties-detail.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },

  // Themen-Apartments
  { path: 'martini-racing', component: MartiniRacingComponent },
  { path: 'golden-twenties', component: GoldenTwentiesDetailComponent },

  { path: '**', redirectTo: 'login' }
];

