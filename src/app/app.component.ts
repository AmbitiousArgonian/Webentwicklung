import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HeroComponent } from './pages/landing/hero/hero.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeroComponent, NavbarComponent],
  // Redundant da templateUrl verwendet wird
  //template: `
  //<router-outlet></router-outlet>
  // `,
  templateUrl: './app.component.html',
})
export class AppComponent {}
