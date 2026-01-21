import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  scrollY = 0;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollY = window.scrollY;
  }
}
