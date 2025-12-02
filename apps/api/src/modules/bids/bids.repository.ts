import { Bid, BidListFilters } from './bids.types';

export class BidRepository {
  private bids: Bid[] = [];

  create(bid: Bid): Bid {
    this.bids.push(bid);
    return bid;
  }

  update(id: string, payload: Partial<Bid>): Bid | undefined {
    const index = this.bids.findIndex((item) => item.id === id);
    if (index === -1) return undefined;
    this.bids[index] = { ...this.bids[index], ...payload, updatedAt: new Date() };
    return this.bids[index];
  }

  findById(id: string): Bid | undefined {
    return this.bids.find((item) => item.id === id);
  }

  listByContractor(contractorId: string, filters: BidListFilters = {}): Bid[] {
    return this.bids.filter((bid) => {
      if (bid.contractorId !== contractorId) return false;
      if (filters.status && bid.status !== filters.status) return false;
      return true;
    });
  }

  listByTender(tenderId: string): Bid[] {
    return this.bids.filter((bid) => bid.tenderId === tenderId);
  }
}
