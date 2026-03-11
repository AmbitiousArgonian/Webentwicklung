export interface Booking {

  id: string;

  apartment: string;

  startDate: Date;
  endDate: Date;

  adults: number;
  children?: number;

  message?: string;

  referral?: string;

  createdAt: Date;

  user: {
    firstName: string;
    lastName: string;
    email: string;
  };

  status: 'PENDING' | 'CONFIRMED' | 'DECLINED';
}