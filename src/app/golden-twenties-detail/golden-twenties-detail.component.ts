import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-golden-twenties-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './golden-twenties-detail.component.html',
  styleUrls: ['./golden-twenties-detail.component.css']
})
export class GoldenTwentiesDetailComponent {

images = [
  'assets/images/IMG-20220510-WA0001.jpg',
  'assets/images/IMG-20220510-WA0003.jpg',
  'assets/images/IMG-20220510-WA0004.jpg'
];

currentImage = this.images[0];
currentIndex = 0;

ngOnInit() {
  setInterval(() => {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }, 4000); // alle 4 Sekunden wechseln
}
}
