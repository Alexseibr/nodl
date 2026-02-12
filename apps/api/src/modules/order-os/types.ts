export type Role = 'OWNER' | 'MANAGER' | 'MEASURER' | 'INSTALLER' | 'ACCOUNTANT';
export type CompanyType = 'DEALER' | 'FACTORY';

export type LeadStatus = 'NEW' | 'IN_PROGRESS' | 'WON' | 'LOST';
export type OrderStatus =
  | 'DRAFT'
  | 'MEASURED'
  | 'OFFER_CREATED'
  | 'OFFER_SENT'
  | 'CONFIRMED'
  | 'SENT_TO_FACTORY'
  | 'IN_PRODUCTION'
  | 'READY'
  | 'INSTALLED'
  | 'CLOSED';

export type PaymentStatus = 'UNPAID' | 'PARTIAL' | 'PAID';
export type TaskType = 'MEASURE' | 'INSTALL' | 'CALL';
export type TaskStatus = 'PLANNED' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
export type OrderItemType = 'WINDOW' | 'DOOR';
export type PricingRuleType = 'PERCENT' | 'FIXED' | 'COEFFICIENT';
export type DocumentType = 'OFFER' | 'INVOICE' | 'CONTRACT' | 'SPEC' | 'ACT';
export type DocumentStatus = 'DRAFT' | 'FINAL';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company extends BaseEntity {
  name: string;
  type: CompanyType;
}

export interface User extends BaseEntity {
  companyId: string;
  fullName: string;
  email: string;
  role: Role;
  active: boolean;
}

export interface Lead extends BaseEntity {
  companyId: string;
  name: string;
  phone: string;
  status: LeadStatus;
  assignedTo?: string;
  notes?: string;
}

export interface Address extends BaseEntity {
  companyId: string;
  city: string;
  line1: string;
  lat?: number;
  lng?: number;
}

export interface Opening extends BaseEntity {
  companyId: string;
  widthMm: number;
  heightMm: number;
  type: string;
  addressId: string;
  measuredBy: string;
  measuredAt: string;
  orderId?: string;
  comment?: string;
}

export interface OrderTotals {
  factory: number;
  dealer: number;
  margin: number;
}

export interface Order extends BaseEntity {
  companyId: string;
  leadId?: string;
  addressId: string;
  factoryCompanyId?: string;
  assignedTo?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totals: OrderTotals;
}

export interface OrderItem extends BaseEntity {
  companyId: string;
  orderId: string;
  openingId?: string;
  type: OrderItemType;
  title: string;
  qty: number;
  attributes: Record<string, unknown>;
  priceFactory: number;
  priceDealer?: number;
}

export interface PricingRule extends BaseEntity {
  companyId: string;
  ruleType: PricingRuleType;
  value: number;
  scope?: Record<string, unknown>;
}

export interface DocumentRecord extends BaseEntity {
  companyId: string;
  orderId: string;
  type: DocumentType;
  status: DocumentStatus;
  fileUrl: string;
  meta?: Record<string, unknown>;
}

export interface FileRecord extends BaseEntity {
  companyId: string;
  entityType: string;
  entityId: string;
  fileUrl: string;
  meta?: Record<string, unknown>;
}

export interface TaskRecord extends BaseEntity {
  companyId: string;
  orderId?: string;
  type: TaskType;
  scheduledAt: string;
  assignedTo: string;
  status: TaskStatus;
  note?: string;
}

export interface AuditLog extends BaseEntity {
  companyId: string;
  userId: string;
  entityType: string;
  entityId: string;
  action: string;
  diff: Record<string, { before: unknown; after: unknown }>;
}

export interface RequestUser {
  id: string;
  companyId: string;
  role: Role;
}
