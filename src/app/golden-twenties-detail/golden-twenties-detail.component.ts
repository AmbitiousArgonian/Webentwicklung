import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingCalendarComponent } from '../booking-calendar/booking-calendar.component';

@Component({
  selector: 'app-golden-twenties-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BookingCalendarComponent
  ],
  templateUrl: './golden-twenties-detail.component.html',
  styleUrls: ['./golden-twenties-detail.component.css']
})
export class GoldenTwentiesDetailComponent {

  images = [
    'assets/images/IMG-20220510-WA0001.jpg',
    'assets/images/IMG-20220510-WA0003.jpg',
    'assets/images/IMG-20220510-WA0004.jpg',
    'assets/images/IMG-20220718-WA0014.jpg',
    'assets/images/OLD Villa Mondial EG_0000617_edited.jpg',
    'assets/images/OLD Villa Mondial EG_0000619.jpg',
    'assets/images/Villa Mondial EG_0000594.jpg',
    'assets/images/Villa Mondial EG_0000597.jpg',
    'assets/images/Villa Mondial EG_0000599_edited.jpg',
    'assets/images/Villa Mondial EG_0000601.jpg',
    'assets/images/Villa Mondial EG_0000603.jpg',
    'assets/images/Villa Mondial EG_0000604.jpg',
    'assets/images/Villa Mondial EG_0000614.jpg',
  ];

  currentImage = this.images[0];
  currentIndex = 0;

  arrivalDate: string = '';
  departureDate: string = '';
  guests: number = 2;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 4000);
  }

  checkAvailability() {
    console.log('Anreise:', this.arrivalDate);
    console.log('Abreise:', this.departureDate);
    console.log('Gäste:', this.guests);
  }

  lightboxOpen = false;
  galleryPopupOpen = false;
  currentImageIndex = 0;

  openLightbox(index: number) {
    this.currentImageIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  openGalleryPopup() {
    this.galleryPopupOpen = true;
  }

  closeGalleryPopup() {
    this.galleryPopupOpen = false;
  }

  calendarOpen = false;

  openCalendar() {
    this.calendarOpen = true;
  }

  closeCalendar() {
    this.calendarOpen = false;
  }

  showAllAmenities = false;

  toggleAmenities() {
    this.showAllAmenities = true;
  }

}



