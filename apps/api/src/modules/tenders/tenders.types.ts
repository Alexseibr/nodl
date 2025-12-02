export type TenderStatus =
  | 'draft'
  | 'published'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'expired';

export type TenderCurrency = 'BYN' | 'RUB' | 'PLN' | 'EUR';

export interface TenderLocation {
  lat: number;
  lng: number;
}

export interface Tender {
  id: string;
  customerId: string;
  title: string;
  description: string;
  category: string;
  budgetMin: number | null;
  budgetMax: number | null;
  currency: TenderCurrency;
  addressText: string;
  location: TenderLocation;
  photos: string[];
  deadlinePreferred: Date | null;
  status: TenderStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  selectedBidId?: string;
  city: string;
  country: 'BY' | 'RU' | 'PL';
}

export interface TenderListFilters {
  status?: TenderStatus;
  city?: string;
  country?: Tender['country'];
  category?: string;
  radiusKm?: number;
  lat?: number;
  lng?: number;
  limit?: number;
  offset?: number;
}
