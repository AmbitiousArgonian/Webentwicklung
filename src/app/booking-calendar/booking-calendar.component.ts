import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service';

interface CalendarDay {
  number: number | '';
  date: Date | null;
}

@Component({
  selector: 'app-booking-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent {

  monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  weekDays = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];

  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();

  days: CalendarDay[] = [];

  startDate: Date | null = null;
  endDate: Date | null = null;

  bookedRanges: { start: Date; end: Date }[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
    this.generateCalendar();
  }

  loadBookings() {
    this.bookingService.getBookings("APARTMENT_1").subscribe((bookings: any[]) => {
      this.bookedRanges = bookings.map((b: any) => ({
        start: new Date(b.startDate),
        end: new Date(b.endDate)
      }));
    });
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    const startOffset = (firstDay.getDay() + 6) % 7;

    this.days = [];

    for (let i = 0; i < startOffset; i++) {
      this.days.push({ number: '', date: null });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(this.currentYear, this.currentMonth, d);
      this.days.push({ number: d, date });
    }
  }

  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  isPast(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    return date < today;
  }

  isBooked(date: Date | null): boolean {
    if (!date) return false;

    return this.bookedRanges.some(range =>
      date >= range.start && date <= range.end
    );
  }

  isAvailable(date: Date | null): boolean {
    if (!date) return false;
    return !this.isBooked(date) && !this.isPast(date);
  }

  selectDate(date: Date | null): void {
    if (!date) return;
    if (this.isPast(date)) return;
    if (this.isBooked(date)) return;

    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
      return;
    }

    if (date <= this.startDate) return;

    const hasBlockedBetween = this.bookedRanges.some(range =>
      range.start > this.startDate! && range.start < date
    );

    if (hasBlockedBetween) return;

    this.endDate = date;
  }

  isSelected(date: Date | null): boolean {
    if (!date) return false;

    const isStart =
      this.startDate !== null &&
      date.getTime() === this.startDate.getTime();

    const isEnd =
      this.endDate !== null &&
      date.getTime() === this.endDate.getTime();

    return isStart || isEnd;
  }

  isInRange(date: Date | null): boolean {
    if (!date || !this.startDate || !this.endDate) return false;
    return date > this.startDate && date < this.endDate;
  }

  book(): void {
    console.log("Buchung:", this.startDate, this.endDate);
    // Hier kannst du später POST-Request an dein Backend einbauen, um die Buchung zu speichern.
  }
}
