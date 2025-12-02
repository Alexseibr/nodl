import { randomUUID } from 'crypto';
import { CreateBidDto, UpdateBidDto } from './bids.dto';
import { Bid } from './bids.types';
import { BidRepository } from './bids.repository';
import { TenderRepository } from '../tenders';
import { BidsPromotionsService } from '../bids-promotions/bids-promotions.service';

export class BidsService {
  constructor(
    private readonly repository: BidRepository,
    private readonly tendersRepository: TenderRepository,
    private readonly promotionsService?: BidsPromotionsService,
  ) {}

  createBid(contractorId: string, dto: CreateBidDto): Bid | undefined {
    const tender = this.tendersRepository.findById(dto.tenderId);
    if (!tender || tender.status !== 'published') return undefined;

    const bid: Bid = {
      id: randomUUID(),
      tenderId: dto.tenderId,
      contractorId,
      price: dto.price,
      currency: dto.currency,
      estimatedDurationDays: dto.estimatedDurationDays,
      canStartFrom: new Date(dto.canStartFrom),
      comment: dto.comment ?? '',
      includesMaterials: dto.includesMaterials,
      warrantyMonths: dto.warrantyMonths ?? null,
      status: 'sent',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.repository.create(bid);
  }

  updateBid(id: string, contractorId: string, dto: UpdateBidDto): Bid | undefined {
    const existing = this.repository.findById(id);
    if (!existing || existing.contractorId !== contractorId) return undefined;
    if (existing.status === 'accepted' || existing.status === 'rejected') return undefined;

    return this.repository.update(id, {
      ...dto,
      canStartFrom: dto.canStartFrom ? new Date(dto.canStartFrom) : existing.canStartFrom,
      status: existing.status,
    } as Partial<Bid>);
  }

  listMyBids(contractorId: string): Bid[] {
    return this.repository.listByContractor(contractorId);
  }

  listByTender(tenderId: string): Bid[] {
    const bids = this.repository.listByTender(tenderId);
    if (!this.promotionsService) return bids;

    const tier = (bid: Bid) => {
      const hasPriority = this.promotionsService?.getStatus(bid.id).some((promo) => promo.type === 'priority');
      const hasBoost = this.promotionsService?.getStatus(bid.id).some((promo) => promo.type === 'boost');
      const plan = this.promotionsService.getSubscriptionTier(bid.contractorId);
      if (hasPriority) return 0;
      if (hasBoost) return 1;
      if (plan === 'pro_plus') return 2;
      if (plan === 'pro' || plan === 'starter') return 3;
      return 4;
    };

    return bids
      .slice()
      .sort((a, b) => {
        const tierDiff = tier(a) - tier(b);
        if (tierDiff !== 0) return tierDiff;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }

  shortlistBid(tenderId: string, bidId: string, customerId: string): Bid | undefined {
    const tender = this.tendersRepository.findById(tenderId);
    if (!tender || tender.customerId !== customerId) return undefined;
    const bid = this.repository.findById(bidId);
    if (!bid || bid.tenderId !== tenderId) return undefined;
    return this.repository.update(bidId, { status: 'shortlisted' });
  }

  acceptBid(tenderId: string, bidId: string, customerId: string): Bid | undefined {
    const tender = this.tendersRepository.findById(tenderId);
    if (!tender || tender.customerId !== customerId) return undefined;

    const targetBid = this.repository.findById(bidId);
    if (!targetBid || targetBid.tenderId !== tenderId) return undefined;

    const tenderBids = this.repository.listByTender(tenderId);
    tenderBids.forEach((bid) => {
      const status = bid.id === bidId ? 'accepted' : 'rejected';
      this.repository.update(bid.id, { status });
    });

    this.tendersRepository.setSelectedBid(tenderId, bidId);
    return this.repository.findById(bidId);
  }
}
