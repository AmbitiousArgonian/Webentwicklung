import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  submitted = false;

  bookingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],

    apartment: ['', Validators.required],

    dateRange: this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    }),

    adults: ['', Validators.required],
    children: [''],

    message: [''],

    referral: [''],

    privacy: [false, Validators.requiredTrue],

    /*verstecktes Feld welches wenn ausgefüllt das Formular nicht abschickt */
    company: ['']
  });

  constructor(private fb: FormBuilder) {}

  submit() {

    if (this.bookingForm.get('company')?.value) {
      return; // Bot erkannt, Formular wird nicht gesendet
    }

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    console.log(this.bookingForm.value);
    this.submitted = true;
  }
}
