import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-martini-racing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './martini-racing.component.html',
  styleUrls: ['./martini-racing.component.css']
})
export class MartiniRacingComponent {

  images = [
    'assets/images/martini-racing/essbereich.jpg',
    'assets/images/martini-racing/sitzbereich.jpg',
    'assets/images/martini-racing/schlafzimmer.png',
    'assets/images/martini-racing/badezimmer.jpg'
  ];

  currentImage = this.images[0];
  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 4000);
  }
}
