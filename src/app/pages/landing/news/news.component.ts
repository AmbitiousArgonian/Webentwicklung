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
      title: 'Shuttelservice von Merzig Bf / Türkesmühle Bf zur Unterkunft',
      text: 'Jetzt auch bequem mit dem Zug Anreisen. Kostenloser Shuttelservice ab 3 Nächte Aufenthalt für Hin- und Rückfahrt zum Bahnhof in Türkesmühle oder Merzig. .',
      date: 'Januar 2026',
      image: 'assets/images/Shuttle.jpg'
    },
    {
      title: 'Traumschleifen direckt vor der Haustür',
      text: 'Erleben sie die Premiumwanderwege des Saarlandes. Für Tagestouren ausgelegt, top gepflegt und gut beschildert.',
      date: 'Januar 2026',
      image: 'assets/images/Landschaft.jpg'
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
// Pause bei Hover
  onMouseEnter() {
    clearInterval(this.intervalId);
  }

  onMouseLeave() {
    this.startAutoSlide();
  }
  
}
