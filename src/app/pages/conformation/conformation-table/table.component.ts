import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from 'src/app/core/models/booking.model';

@Component({
  selector: 'conformation-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html'
})
export class ConformationTableComponent {

  @Input() bookings: Booking[] = [];

  @Output() selectBooking = new EventEmitter<Booking>();

  select(booking: Booking) {
    this.selectBooking.emit(booking);
  }

}