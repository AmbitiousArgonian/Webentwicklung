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
      longText: 'very long text to test the layout of the experience component in the landing page for the apartments. \n here could be some more text to see how it looks like when there is a lot of text in this section. more text here to fill this section. more. and even more text. finally some line breaks to see how it looks like.'
    },
    {
      title: 'Modernster\nKomfort',
      text: 'Hochwertige Ausstattung für entspannte Aufenthalte.',
      image: 'assets/EG-Komfort.jpg',
      longText: 'Komfort. placeholder long text to test the layout of the experience component in the landing page for the apartments. this shows how the text will look like when expanded.'
    },
    {
      title: 'Zentrale\nLage',
      image: 'assets/Mondial-lage.jpg',
      longText: 'Lage. placeholder long text to test the layout of the experience component in the landing page for the apartments'
    },
    {
      title: 'Individuelles\nDesign',
      image: 'assets/Mondial-design.jpg',
      longText: 'Design. very long text to test the layout of the experience component in the landing page for the apartments'
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
