import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

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

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 9000); // Wechsel alle 9 Sekunden
  }

  next() { // Manuelles Weiterklicken setzt den Timer zurück
     clearInterval(this.intervalId);
     this.currentIndex = (this.currentIndex + 1) % this.news.length;
     this.startAutoSlide();
  }

  prev() {
    clearInterval(this.intervalId);
    this.currentIndex =
      (this.currentIndex - 1 + this.news.length) % this.news.length;
    this.startAutoSlide();
  }
  
}
