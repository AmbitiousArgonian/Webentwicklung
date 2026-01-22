import { Component, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-apartments',
  standalone: true,
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements AfterViewInit {

  apartments = [
    {
      title: 'Golden Twenties',
      description: 'Eleganz der 1920er Jahre neu interpretiert.',
      image: 'assets/images/landing-golden.jpg',
      route: 'golden-twenties'
    },
    {
      title: 'Martini Racing',
      description: 'Motorsport trifft luxuriöses Design.',
      image: 'assets/images/landing-racing.jpg',
      route: 'martini-racing'
    }
  ];

  visibleCards: boolean[] = [];

  ngAfterViewInit() {
    this.visibleCards = this.apartments.map(() => false);
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkVisibility();
  }

  checkVisibility() {
    const cards = document.querySelectorAll('.apartment-card');

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        this.visibleCards[index] = true;
      }
    });
  }

  onHover(index: number, event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  }

  onLeave(index: number) {
    const card = document.querySelectorAll('.apartment-card')[index] as HTMLElement;
    card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
  }
}
