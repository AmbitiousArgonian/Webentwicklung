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

selectedIndex: number | null = null;
  usps = [
    {
      title: 'Historisches\nAmbiente',
      image: 'assets/EG-historisch.jpg',
      longText: 'Bei der Villa Mondial handelt es sich um ein Ferienhaus der Extraklasse für gehobene Ansprüche. Die Jugendstilvilla wurde im Jahre 1924 gebaut und 2019 aufwendig renoviert und restauriert.'
    },
    {
      title: 'Modernster\nKomfort',
      text: 'Hochwertige Ausstattung für entspannte Aufenthalte.',
      image: 'assets/EG-Komfort.jpg',
      longText: 'Beide Ferienwohungen punktet mit ihrer modernen Einrichtung und dem etablierten edlen Design. Die Küche ist vollständig ausgestattet mit jeglichen Geräten, wie eine Kaffeemaschine, einem Wasserkocher, einer Mikrowelle und selbstverständlich einem Backofen. Diese Küche lässt die Herzen von Hobby-Köchen höherschlagen. Auch das Badezimmer glänzt im modernen Design und verfügt über eine Badewanne, sowie einer ebenerdigen Regendusche.'
    },
    {
      title: 'Zentrale\nLage',
      image: 'assets/Mondial-lage.jpg',
      longText: 'Die Villa Mondial befindet sich im Mittelpunkt des Saarlandes. Die über 100 Sehenswürdigkeiten des Saarlandes sind in weniger als einer Autostunde erreichbar. Die beiden Badeseen erreichen Sie in 10 Minuten (Losheimer Stausee) und 25 Minuten (Bostalsee). Der Golfplatz (75 Hektar mit 27 Loch) ist nur vier Minuten von der Villa entfernt. Die Länder Luxemburg und Frankreich sind jeweils in 45 Minuten erreichbar.  Traumschleifenwanderwege und der Bike Saarlandrundweg beginnen direkt an der Villa.'
    },
    {
      title: 'Individuelles\nDesign',
      image: 'assets/Mondial-design.jpg',
      longText: 'In der Villa befinden sich zwei Ferienwohnungen, die mit vielen technischen Extras auf 107qm und  124qm die sie als Gast verwöhnt. Beide Ferienwohnungen wurden nach einem Motto eingerichtet. Mehr hierzu unter den Reitern Golden Twenties und Racing. '
    }
  ];
select(index: number) {
  this.selectedIndex = this.selectedIndex === index ? null : index;
 
}
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
