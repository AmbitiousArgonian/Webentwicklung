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

}