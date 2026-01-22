import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HeroComponent } from './pages/landing/hero/hero.component';
import { ApartmentsComponent } from './pages/landing/apartments/apartments.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeroComponent, NavbarComponent, ApartmentsComponent],
  // Redundant da templateUrl verwendet wird
  //template: `
  //<router-outlet></router-outlet>
  // `,
  templateUrl: './app.component.html',
})
export class AppComponent {}
