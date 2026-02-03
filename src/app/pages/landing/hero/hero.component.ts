import { Component, HostListener, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  private viewportScroller = inject(ViewportScroller);

  scrollY = 0;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollY = window.scrollY;
  }

  scrollToExperience() {
    this.viewportScroller.scrollToAnchor('experience');
  }
}
