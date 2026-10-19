export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  totalSpots: number;
  availableSpots: number;
  hourlyRate: number;
  type: 'Covered' | 'Outdoor' | 'Valet' | 'EV Charging';
  rating: number;
  distanceKm: number;
  coordinates: { lat: number; lng: number };
}

export interface BookingDetails {
  locationId: string;
  locationName: string;
  spotNumber: string;
  vehiclePlate: string;
  hours: number;
  totalAmount: number;
  startTime: string;
  bookingCode: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  vehiclePlate: string;
  vehicleModel?: string;
  points: number;
  avatar?: string;
}
