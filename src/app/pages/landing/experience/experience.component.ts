import { Component, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements AfterViewInit {

  usps = [
    {
      title: 'Historisches Ambiente',
      text: 'Sorgfältig restaurierte Architektur mit einzigartigem Flair.'
    },
    {
      title: 'Modernster Komfort',
      text: 'Hochwertige Ausstattung für entspannte Aufenthalte.'
    },
    {
      title: 'Zentrale Lage',
      text: 'Perfekter Ausgangspunkt für Kultur, Genuss und Erholung.'
    },
    {
      title: 'Individuelles Design',
      text: 'Jedes Apartment erzählt seine eigene Geschichte.'
    }
  ];

  visible: boolean[] = [];

  ngAfterViewInit() {
    this.visible = this.usps.map(() => false);
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkVisibility();
  }

  checkVisibility() {
    const elements = document.querySelectorAll('.usp-item');

    elements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        this.visible[i] = true;
      }
    });
  }
}
