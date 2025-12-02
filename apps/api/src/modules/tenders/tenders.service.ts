import { randomUUID } from 'crypto';
import {
  CreateTenderDto,
  ListTendersQueryDto,
  UpdateTenderDto,
} from './tenders.dto';
import { Tender, TenderStatus } from './tenders.types';
import { TenderRepository } from './tenders.repository';

export class TenderService {
  constructor(private readonly repository: TenderRepository) {}

  createTender(customerId: string, dto: CreateTenderDto): Tender {
    const tender: Tender = {
      id: randomUUID(),
      customerId,
      title: dto.title,
      description: dto.description,
      category: dto.category,
      budgetMin: dto.budgetMin ?? null,
      budgetMax: dto.budgetMax ?? null,
      currency: dto.currency,
      addressText: dto.addressText,
      location: { lat: dto.lat, lng: dto.lng },
      photos: dto.photos ?? [],
      deadlinePreferred: dto.deadlinePreferred ? new Date(dto.deadlinePreferred) : null,
      status: dto.publishNow ? 'published' : 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: dto.publishNow ? new Date() : undefined,
      city: dto.city,
      country: dto.country,
    };

    return this.repository.create(tender);
  }

  updateTender(id: string, customerId: string, dto: UpdateTenderDto): Tender | undefined {
    const existing = this.repository.findById(id);
    if (!existing || existing.customerId !== customerId) {
      return undefined;
    }

    if (existing.status !== 'draft' && existing.status !== 'published') {
      return undefined;
    }

    const status: TenderStatus | undefined = dto.publishNow
      ? 'published'
      : dto.status ?? existing.status;

    return this.repository.update(id, {
      ...dto,
      status,
      deadlinePreferred: dto.deadlinePreferred ? new Date(dto.deadlinePreferred) : existing.deadlinePreferred,
      location: dto.lat && dto.lng ? { lat: dto.lat, lng: dto.lng } : existing.location,
      photos: dto.photos ?? existing.photos,
    } as Partial<Tender>);
  }

  publishTender(id: string, customerId: string): Tender | undefined {
    const tender = this.repository.findById(id);
    if (!tender || tender.customerId !== customerId) return undefined;
    if (tender.status !== 'draft') return tender;
    return this.repository.update(id, { status: 'published', publishedAt: new Date() });
  }

  cancelTender(id: string, customerId: string): Tender | undefined {
    const tender = this.repository.findById(id);
    if (!tender || tender.customerId !== customerId) return undefined;
    return this.repository.setStatus(id, 'cancelled');
  }

  listPublic(filters: ListTendersQueryDto): Tender[] {
    return this.repository.listPublic(filters);
  }

  listMyTenders(customerId: string, filters: ListTendersQueryDto): Tender[] {
    return this.repository.listByCustomer(customerId, filters);
  }

  getById(id: string): Tender | undefined {
    return this.repository.findById(id);
  }

  selectBid(tenderId: string, bidId: string, customerId: string): Tender | undefined {
    const tender = this.repository.findById(tenderId);
    if (!tender || tender.customerId !== customerId) return undefined;
    return this.repository.setSelectedBid(tenderId, bidId);
  }
}
