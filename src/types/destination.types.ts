export interface IDestination {
  _id?: string;
  name: string;
  location: string;
  description: string;
  image: string[];
  interests: string[];
  division: any;
  price: number;
  bestTimeToVisit: string;
  activities: string[];
  isFeatured: boolean;
  status: "active" | "inactive";
  reviews: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Trip {
  title: string;
  image: string;
  startDate: string;
  endDate: string;
}

export interface Booking {
  _id: string;
  bookingStatus: string;
  trip: Trip;
}

interface PaymentGatewayData {
  brand?: string;
  last4?: string;
}

export interface PaymentDetails {
  _id: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  totalPeople: number;
  paymentGatewayData?: PaymentGatewayData;
  booking: Booking; // <-- THIS WAS MISSING
}
