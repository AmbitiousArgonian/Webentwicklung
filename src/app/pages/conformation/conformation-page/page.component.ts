import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from 'src/app/core/models/booking.model';
import { ConformationTableComponent } from '../conformation-table/table.component';
import { ConformationCardComponent } from '../conformation-card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'confirmation-page',
  standalone: true,
  imports: [CommonModule, ConformationTableComponent, ConformationCardComponent, FormsModule],
  templateUrl: './page.component.html'
})
export class ConformationPageComponent {

   bookings: Booking[] = [ //Testdaten
    {
      id: '1',
      apartment: 'Golden Twenties',
      startDate: new Date('2026-08-12'),
      endDate: new Date('2026-08-15'),
      adults: 2,
      children: 0,
      message: 'Wir reisen mit dem Auto an.',
      referral: 'Google',
      createdAt: new Date(),
      user: {
        firstName: 'Max',
        lastName: 'Müller',
        email: 'max@test.de'
      },
      status: 'PENDING'
    },
    {
      id: '2',
      apartment: 'Martini Racing',
      startDate: new Date('2026-09-01'),
      endDate: new Date('2026-09-05'),
      adults: 2,
      children: 1,
      message: 'Reisen mit Kind.',
      referral: 'Instagram',
      createdAt: new Date(),
      user: {
        firstName: 'Anna',
        lastName: 'Becker',
        email: 'anna@test.de'
      },
      status: 'PENDING'
    }
  ];

  selectedBooking: Booking | null = null;

  filter = 'ALL';

  sort = 'CREATED';

  selectBooking(booking: Booking) {
    this.selectedBooking = booking;
  }

  closeDetail() {
    this.selectedBooking = null;
  }

}