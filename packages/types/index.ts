export type Role = 'customer' | 'master' | 'team' | 'foreman' | 'store' | 'admin';

export interface UserProfile {
  id: string;
  phone: string;
  roles: Role[];
  country: string;
  language: 'ru' | 'en' | 'pl';
  kycStatus?: 'pending' | 'verified' | 'rejected';
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  budgetEur: number;
  budgetLocal: number;
  currency: 'EUR' | 'BYN' | 'RUB' | 'PLN';
  specialization: string;
  geo: {
    lat: number;
    lng: number;
    radiusKm?: number;
  };
}

export interface Bid {
  id: string;
  tenderId: string;
  authorId: string;
  priceEur: number;
  priceLocal: number;
  currency: 'EUR' | 'BYN' | 'RUB' | 'PLN';
  etaDays: number;
  warrantyMonths?: number;
  status: 'submitted' | 'viewed' | 'selected' | 'rejected';
}
