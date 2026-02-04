import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private api = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  getBookings(apartmentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${apartmentId}`);
  }

  createBooking(booking: any): Observable<any> {
    return this.http.post<any>(this.api, booking);
  }

}

