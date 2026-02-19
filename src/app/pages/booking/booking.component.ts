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

    /* Optionale Account Option */
    createAccount: [false],
    password: [''],
    confirmPassword: [''],

    

    /*verstecktes Feld welches wenn ausgefüllt das Formular nicht abschickt */
    company: ['']
  });

  ngOnInit() {
  this.bookingForm.get('createAccount')?.valueChanges.subscribe(value => {

    const password = this.bookingForm.get('password');
    const confirm = this.bookingForm.get('confirmPassword');

    if (value) {
      password?.setValidators([Validators.required, Validators.minLength(8)]);
      confirm?.setValidators([Validators.required]);
    } else {
      password?.clearValidators();
      confirm?.clearValidators();
    }

    password?.updateValueAndValidity();
    confirm?.updateValueAndValidity();
  });
}


  constructor(private fb: FormBuilder) {}

  submit() {

  if (this.bookingForm.get('company')?.value) return;

  const { password, confirmPassword } = this.bookingForm.value;

  if (this.bookingForm.value.createAccount && password !== confirmPassword) {
    alert('Passwörter stimmen nicht überein.');
    return;
  }

  if (this.bookingForm.invalid) {
    this.bookingForm.markAllAsTouched();
    return;
  }

  console.log(this.bookingForm.value);
}

}
