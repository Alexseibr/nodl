import { Tender, TenderListFilters, TenderStatus } from './tenders.types';

export class TenderRepository {
  private tenders: Tender[] = [];

  create(tender: Tender): Tender {
    this.tenders.push(tender);
    return tender;
  }

  update(id: string, payload: Partial<Tender>): Tender | undefined {
    const index = this.tenders.findIndex((item) => item.id === id);
    if (index === -1) return undefined;
    this.tenders[index] = { ...this.tenders[index], ...payload, updatedAt: new Date() };
    return this.tenders[index];
  }

  findById(id: string): Tender | undefined {
    return this.tenders.find((item) => item.id === id);
  }

  listPublic(filters: TenderListFilters = {}): Tender[] {
    return this.tenders.filter((tender) => {
      if (tender.status !== 'published') return false;
      if (filters.city && tender.city !== filters.city) return false;
      if (filters.country && tender.country !== filters.country) return false;
      if (filters.category && tender.category !== filters.category) return false;
      if (filters.status && tender.status !== filters.status) return false;
      return true;
    });
  }

  listByCustomer(customerId: string, filters: TenderListFilters = {}): Tender[] {
    return this.tenders.filter((tender) => {
      if (tender.customerId !== customerId) return false;
      if (filters.status && tender.status !== filters.status) return false;
      return true;
    });
  }

  setStatus(id: string, status: TenderStatus): Tender | undefined {
    return this.update(id, { status });
  }

  setSelectedBid(id: string, bidId: string): Tender | undefined {
    return this.update(id, { selectedBidId: bidId, status: 'in_progress', publishedAt: new Date() });
  }
}
