export type BidStatus = 'sent' | 'viewed' | 'shortlisted' | 'rejected' | 'accepted';
export type BidCurrency = 'BYN' | 'RUB' | 'PLN' | 'EUR';

export interface Bid {
  id: string;
  tenderId: string;
  contractorId: string;
  price: number;
  currency: BidCurrency;
  estimatedDurationDays: number;
  canStartFrom: Date;
  comment: string;
  includesMaterials: boolean;
  warrantyMonths: number | null;
  status: BidStatus;
  createdAt: Date;
  updatedAt: Date;
}
