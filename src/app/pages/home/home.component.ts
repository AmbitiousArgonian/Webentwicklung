import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { HeroComponent } from '../landing/hero/hero.component';
import { ApartmentsComponent } from '../landing/apartments/apartments.component';
import { ExperienceComponent } from '../landing/experience/experience.component';
import { NewsComponent } from '../landing/news/news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HeroComponent, ApartmentsComponent, ExperienceComponent, NewsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}