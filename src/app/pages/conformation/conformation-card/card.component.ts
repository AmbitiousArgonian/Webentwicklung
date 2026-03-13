/*
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from 'src/app/core/models/booking.model';

@Component({
  selector: 'app-conformation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class ConformationCardComponent {

  @Input() booking!: Booking;

  @Output() close = new EventEmitter<void>();

} */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from 'src/app/core/models/booking.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conformation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class ConformationCardComponent {

  @Input() booking!: Booking;

  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>(); // ← wichtig

  constructor(private http: HttpClient) {}

  confirmBooking() {
    this.http.post(`http://localhost:8000/api/booking/${this.booking.id}/confirm`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.updated.emit(); // Admin‑Liste aktualisieren
          this.close.emit();   // Karte schließen
        },
        error: err => console.error("Fehler beim Bestätigen", err)
      });
  }

  declineBooking() {
    this.http.post(`http://localhost:8000/api/booking/${this.booking.id}/decline`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.updated.emit(); // Admin‑Liste aktualisieren
          this.close.emit();   // Karte schließen
        },
        error: err => console.error("Fehler beim Ablehnen", err)
      });
  }
}
