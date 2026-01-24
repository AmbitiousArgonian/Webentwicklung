import { Component, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements AfterViewInit {

  news = [
    {
      title: 'Shuttelservice Merzig / Türkesmühle',
      text: 'Jetzt auch bequem mit dem Zug Anreisen. Kostenloser Shuttelservice ab 3 Nächte Aufenthalt.',
      date: 'Januar 2026',
      image: 'assets/images/news1.jpg'
    },
    {
      title: 'Bester Wanderweg Deutschlands',
      text: 'Entdeckt den Teufelspfad, die höchstbepunktete Traumsschleifenpfad in Deutschland',
      date: 'Januar 2026',
      image: 'assets/images/news2.jpg'
    },
    {
      title: 'Hier könnte ihre Werbung stehen',
      text: 'Wirklich, das hier ist Freitext der in Produktivbetrieb mit was sinnvollen gefüllt wird.',
      date: 'November 1987',
      image: 'assets/images/news3.jpg'
    }
  ];

  visible: boolean[] = [];

  ngAfterViewInit() {
    this.visible = this.news.map(() => false);
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkVisibility();
  }

  checkVisibility() {
    const elements = document.querySelectorAll('.news-card');

    elements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        this.visible[i] = true;
      }
    });
  }
}
