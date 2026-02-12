import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { gzipSync } from 'zlib';
import { join } from 'path';
import { randomUUID } from 'crypto';
import {
  Address,
  AuditLog,
  Company,
  DocumentRecord,
  DocumentType,
  FileRecord,
  Lead,
  Opening,
  Order,
  OrderItem,
  PricingRule,
  RequestUser,
  TaskRecord,
  User,
} from './types';

function now() {
  return new Date().toISOString();
}

function makeDiff(before: any, after: any) {
  const diff: Record<string, { before: unknown; after: unknown }> = {};
  for (const key of Object.keys(after)) {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
      diff[key] = { before: before[key], after: after[key] };
    }
  }
  return diff;
}

@Injectable()
export class OrderOsService {
  private companies: Company[] = [];
  private users: User[] = [];
  private leads: Lead[] = [];
  private addresses: Address[] = [];
  private openings: Opening[] = [];
  private orders: Order[] = [];
  private orderItems: OrderItem[] = [];
  private pricingRules: PricingRule[] = [];
  private documents: DocumentRecord[] = [];
  private files: FileRecord[] = [];
  private tasks: TaskRecord[] = [];
  private auditLogs: AuditLog[] = [];

  constructor() {
    mkdirSync(join(process.cwd(), 'storage'), { recursive: true });
    this.seed();
  }

  private seed() {
    const ts = now();
    const company: Company = { id: 'cmp_demo', name: 'Demo Windows LLC', type: 'DEALER', createdAt: ts, updatedAt: ts };
    const owner: User = {
      id: 'usr_owner',
      companyId: company.id,
      fullName: 'Demo Owner',
      email: 'owner@demo.local',
      role: 'OWNER',
      active: true,
      createdAt: ts,
      updatedAt: ts,
    };
    this.companies.push(company);
    this.users.push(owner);
  }

  findUser(id: string) {
    return this.users.find((u) => u.id === id);
  }

  private enforceCompany<T extends { companyId: string }>(user: RequestUser, entity: T | undefined, label: string): T {
    if (!entity || entity.companyId !== user.companyId) throw new NotFoundException(`${label} not found`);
    return entity;
  }

  private log(user: RequestUser, entityType: string, entityId: string, action: string, diff: Record<string, { before: unknown; after: unknown }>) {
    this.auditLogs.push({
      id: randomUUID(),
      companyId: user.companyId,
      userId: user.id,
      entityType,
      entityId,
      action,
      diff,
      createdAt: now(),
      updatedAt: now(),
    });
  }

  me(user: RequestUser) {
    return this.findUser(user.id);
  }

  usersList(user: RequestUser) {
    return this.users.filter((u) => u.companyId === user.companyId);
  }

  createUser(user: RequestUser, payload: Pick<User, 'fullName' | 'email' | 'role'>) {
    const ts = now();
    const created: User = { id: randomUUID(), companyId: user.companyId, active: true, createdAt: ts, updatedAt: ts, ...payload };
    this.users.push(created);
    return created;
  }

  patchUser(user: RequestUser, id: string, payload: Partial<Pick<User, 'fullName' | 'email' | 'role'>>) {
    const existing = this.enforceCompany(user, this.users.find((u) => u.id === id), 'user');
    const before = { ...existing };
    Object.assign(existing, payload, { updatedAt: now() });
    this.log(user, 'User', id, 'USER_UPDATED', makeDiff(before, existing));
    return existing;
  }

  disableUser(user: RequestUser, id: string) {
    const existing = this.enforceCompany(user, this.users.find((u) => u.id === id), 'user');
    const before = { ...existing };
    existing.active = false;
    existing.updatedAt = now();
    this.log(user, 'User', id, 'USER_DISABLED', makeDiff(before, existing));
    return existing;
  }

  createLead(user: RequestUser, payload: Pick<Lead, 'name' | 'phone' | 'notes'>) {
    const ts = now();
    const lead: Lead = { id: randomUUID(), companyId: user.companyId, status: 'NEW', createdAt: ts, updatedAt: ts, ...payload };
    this.leads.push(lead);
    return lead;
  }

  listLeads(user: RequestUser, q?: string, status?: string, assignedTo?: string) {
    return this.leads.filter((l) => l.companyId === user.companyId)
      .filter((l) => (!q || `${l.name} ${l.phone}`.toLowerCase().includes(q.toLowerCase())))
      .filter((l) => (!status || l.status === status))
      .filter((l) => (!assignedTo || l.assignedTo === assignedTo));
  }

  getLead(user: RequestUser, id: string) {
    return this.enforceCompany(user, this.leads.find((l) => l.id === id), 'lead');
  }

  patchLead(user: RequestUser, id: string, payload: Partial<Lead>) {
    const lead = this.getLead(user, id);
    const before = { ...lead };
    Object.assign(lead, payload, { updatedAt: now(), companyId: user.companyId, id: lead.id });
    this.log(user, 'Lead', id, 'LEAD_UPDATED', makeDiff(before, lead));
    return lead;
  }

  assignLead(user: RequestUser, id: string, assignedTo: string) {
    return this.patchLead(user, id, { assignedTo });
  }

  createAddress(user: RequestUser, payload: Pick<Address, 'city' | 'line1' | 'lat' | 'lng'>) {
    const ts = now();
    const address: Address = { id: randomUUID(), companyId: user.companyId, createdAt: ts, updatedAt: ts, ...payload };
    this.addresses.push(address);
    return address;
  }

  convertLeadToOrder(user: RequestUser, id: string, addressId: string) {
    const lead = this.getLead(user, id);
    this.enforceCompany(user, this.addresses.find((a) => a.id === addressId), 'address');
    const order = this.createOrder(user, { leadId: lead.id, addressId });
    this.patchLead(user, id, { status: 'WON' });
    return order;
  }

  createOpening(user: RequestUser, payload: Omit<Opening, 'id' | 'companyId' | 'createdAt' | 'updatedAt'>) {
    this.enforceCompany(user, this.addresses.find((a) => a.id === payload.addressId), 'address');
    const ts = now();
    const opening: Opening = { id: randomUUID(), companyId: user.companyId, createdAt: ts, updatedAt: ts, ...payload };
    this.openings.push(opening);
    return opening;
  }

  listOpenings(user: RequestUser, addressId?: string, orderId?: string) {
    return this.openings.filter((o) => o.companyId === user.companyId)
      .filter((o) => (!addressId || o.addressId === addressId))
      .filter((o) => (!orderId || o.orderId === orderId));
  }

  getOpening(user: RequestUser, id: string) {
    return this.enforceCompany(user, this.openings.find((o) => o.id === id), 'opening');
  }

  patchOpening(user: RequestUser, id: string, payload: Partial<Opening>) {
    const opening = this.getOpening(user, id);
    const before = { ...opening };
    Object.assign(opening, payload, { updatedAt: now(), companyId: user.companyId, id: opening.id });
    this.log(user, 'Opening', id, 'OPENING_UPDATED', makeDiff(before, opening));
    return opening;
  }

  attachFile(user: RequestUser, entityType: string, entityId: string, content: string, filename: string) {
    const filePath = join(process.cwd(), 'storage', `${Date.now()}-${filename}`);
    writeFileSync(filePath, content, 'utf-8');
    const ts = now();
    const rec: FileRecord = {
      id: randomUUID(),
      companyId: user.companyId,
      entityType,
      entityId,
      fileUrl: filePath,
      meta: {},
      createdAt: ts,
      updatedAt: ts,
    };
    this.files.push(rec);
    return rec;
  }

  createOrder(user: RequestUser, payload: Pick<Order, 'leadId' | 'addressId' | 'factoryCompanyId'>) {
    this.enforceCompany(user, this.addresses.find((a) => a.id === payload.addressId), 'address');
    const ts = now();
    const order: Order = {
      id: randomUUID(),
      companyId: user.companyId,
      status: 'DRAFT',
      paymentStatus: 'UNPAID',
      totals: { factory: 0, dealer: 0, margin: 0 },
      createdAt: ts,
      updatedAt: ts,
      ...payload,
    };
    this.orders.push(order);
    return order;
  }

  listOrders(user: RequestUser, status?: string, payment?: string, assignedTo?: string, q?: string) {
    return this.orders.filter((o) => o.companyId === user.companyId)
      .filter((o) => (!status || o.status === status))
      .filter((o) => (!payment || o.paymentStatus === payment))
      .filter((o) => (!assignedTo || o.assignedTo === assignedTo))
      .filter((o) => (!q || o.id.includes(q)));
  }

  getOrder(user: RequestUser, id: string) {
    const order = this.enforceCompany(user, this.orders.find((o) => o.id === id), 'order');
    return {
      ...order,
      items: this.orderItems.filter((i) => i.orderId === id && i.companyId === user.companyId),
      documents: this.documents.filter((d) => d.orderId === id && d.companyId === user.companyId),
      tasks: this.tasks.filter((t) => t.orderId === id && t.companyId === user.companyId),
      audit: this.auditLogs.filter((a) => a.entityId === id && a.companyId === user.companyId),
    };
  }

  patchOrder(user: RequestUser, id: string, payload: Partial<Order>) {
    const order = this.enforceCompany(user, this.orders.find((o) => o.id === id), 'order');
    const before = { ...order };
    Object.assign(order, payload, { updatedAt: now(), companyId: user.companyId, id: order.id });
    this.log(user, 'Order', id, 'ORDER_UPDATED', makeDiff(before, order));
    return order;
  }

  assignOrder(user: RequestUser, id: string, assignedTo: string) {
    return this.patchOrder(user, id, { assignedTo });
  }

  setOrderStatus(user: RequestUser, id: string, status: Order['status']) {
    const order = this.enforceCompany(user, this.orders.find((o) => o.id === id), 'order');
    if (order.status === 'DRAFT' && status === 'MEASURED') {
      const valid = this.openings.some((o) => o.companyId === user.companyId && o.orderId === id && o.widthMm > 0 && o.heightMm > 0);
      if (!valid) throw new BadRequestException('Need at least one opening with dimensions');
    }
    if (order.status === 'MEASURED' && status === 'OFFER_CREATED') {
      if (!this.orderItems.some((i) => i.orderId === id && i.companyId === user.companyId)) {
        throw new BadRequestException('Need at least one order item');
      }
    }
    if (order.status === 'OFFER_CREATED' && status === 'OFFER_SENT') {
      if (!this.documents.some((d) => d.orderId === id && d.companyId === user.companyId && d.type === 'OFFER')) {
        throw new BadRequestException('Need OFFER document');
      }
    }
    if (order.status === 'CONFIRMED' && status === 'SENT_TO_FACTORY') {
      const hasExport = this.documents.some((d) => d.orderId === id && d.companyId === user.companyId && d.type === 'SPEC');
      if (!order.factoryCompanyId || !hasExport) throw new BadRequestException('Need factory and export package');
    }
    return this.patchOrder(user, id, { status });
  }

  addOrderItem(user: RequestUser, orderId: string, payload: Omit<OrderItem, 'id' | 'createdAt' | 'updatedAt' | 'companyId' | 'orderId'>) {
    this.enforceCompany(user, this.orders.find((o) => o.id === orderId), 'order');
    const ts = now();
    const item: OrderItem = { id: randomUUID(), companyId: user.companyId, orderId, createdAt: ts, updatedAt: ts, ...payload };
    this.orderItems.push(item);
    this.recalculate(user, orderId);
    return item;
  }

  patchOrderItem(user: RequestUser, orderId: string, itemId: string, payload: Partial<OrderItem>) {
    const item = this.enforceCompany(user, this.orderItems.find((i) => i.id === itemId && i.orderId === orderId), 'order item');
    const before = { ...item };
    Object.assign(item, payload, { updatedAt: now(), id: item.id, companyId: item.companyId, orderId: item.orderId });
    this.log(user, 'OrderItem', item.id, 'ORDER_ITEM_UPDATED', makeDiff(before, item));
    this.recalculate(user, orderId);
    return item;
  }

  removeOrderItem(user: RequestUser, orderId: string, itemId: string) {
    const idx = this.orderItems.findIndex((i) => i.id === itemId && i.orderId === orderId && i.companyId === user.companyId);
    if (idx < 0) throw new NotFoundException('order item not found');
    this.orderItems.splice(idx, 1);
    this.recalculate(user, orderId);
    return { ok: true };
  }

  createPricingRule(user: RequestUser, payload: Omit<PricingRule, 'id' | 'companyId' | 'createdAt' | 'updatedAt'>) {
    const ts = now();
    const rule: PricingRule = { id: randomUUID(), companyId: user.companyId, createdAt: ts, updatedAt: ts, ...payload };
    this.pricingRules.push(rule);
    return rule;
  }

  listPricingRules(user: RequestUser) {
    return this.pricingRules.filter((r) => r.companyId === user.companyId);
  }

  patchPricingRule(user: RequestUser, id: string, payload: Partial<PricingRule>) {
    const rule = this.enforceCompany(user, this.pricingRules.find((r) => r.id === id), 'pricing rule');
    Object.assign(rule, payload, { updatedAt: now(), id: rule.id, companyId: rule.companyId });
    return rule;
  }

  recalculate(user: RequestUser, orderId: string) {
    const order = this.enforceCompany(user, this.orders.find((o) => o.id === orderId), 'order');
    const items = this.orderItems.filter((i) => i.orderId === orderId && i.companyId === user.companyId);
    const totalFactory = items.reduce((acc, i) => acc + i.priceFactory * i.qty, 0);
    let totalDealer = items.reduce((acc, i) => acc + (i.priceDealer ?? 0) * i.qty, 0);
    if (!items.some((i) => i.priceDealer !== undefined)) {
      const rule = this.pricingRules.find((r) => r.companyId === user.companyId);
      if (rule) {
        if (rule.ruleType === 'PERCENT') totalDealer = totalFactory * (1 + rule.value / 100);
        if (rule.ruleType === 'FIXED') totalDealer = totalFactory + rule.value;
        if (rule.ruleType === 'COEFFICIENT') totalDealer = totalFactory * rule.value;
      } else {
        totalDealer = totalFactory;
      }
    }
    const before = { ...order.totals };
    order.totals = { factory: totalFactory, dealer: totalDealer, margin: totalDealer - totalFactory };
    order.updatedAt = now();
    this.log(user, 'Order', orderId, 'ORDER_RECALCULATED', makeDiff(before as unknown as Record<string, unknown>, order.totals as unknown as Record<string, unknown>));
    return order;
  }

  listDocuments(user: RequestUser, orderId: string) {
    return this.documents.filter((d) => d.companyId === user.companyId && d.orderId === orderId);
  }

  generateDocument(user: RequestUser, orderId: string, type: DocumentType) {
    const order = this.enforceCompany(user, this.orders.find((o) => o.id === orderId), 'order');
    const items = this.orderItems.filter((i) => i.orderId === orderId && i.companyId === user.companyId);
    const address = this.addresses.find((a) => a.id === order.addressId);
    const html = `Order ${order.id}\nAddress: ${address?.line1 ?? ''}\nItems:\n${items.map((i) => `- ${i.title} x${i.qty} attrs:${JSON.stringify(i.attributes)}`).join('\n')}\nTotals: ${JSON.stringify(order.totals)}`;
    const filePath = join(process.cwd(), 'storage', `${order.id}-${type}.pdf`);
    writeFileSync(filePath, html, 'utf-8');
    const ts = now();
    const document: DocumentRecord = {
      id: randomUUID(),
      companyId: user.companyId,
      orderId,
      type,
      status: 'DRAFT',
      fileUrl: filePath,
      createdAt: ts,
      updatedAt: ts,
      meta: { generatedAt: ts },
    };
    this.documents.push(document);
    this.log(user, 'Document', document.id, 'DOCUMENT_GENERATED', { fileUrl: { before: null, after: filePath } });
    return document;
  }

  finalizeDocument(user: RequestUser, id: string) {
    const doc = this.enforceCompany(user, this.documents.find((d) => d.id === id), 'document');
    if (doc.status === 'FINAL') throw new BadRequestException('Already final');
    const before = { ...doc };
    doc.status = 'FINAL';
    doc.updatedAt = now();
    this.log(user, 'Document', id, 'DOCUMENT_FINALIZED', makeDiff(before, doc));
    return doc;
  }

  createTask(user: RequestUser, payload: Omit<TaskRecord, 'id' | 'createdAt' | 'updatedAt' | 'companyId'>) {
    const ts = now();
    const task: TaskRecord = { id: randomUUID(), companyId: user.companyId, createdAt: ts, updatedAt: ts, ...payload };
    this.tasks.push(task);
    return task;
  }

  listTasks(user: RequestUser, from?: string, to?: string, assignedTo?: string, type?: string) {
    return this.tasks.filter((t) => t.companyId === user.companyId)
      .filter((t) => (!assignedTo || t.assignedTo === assignedTo))
      .filter((t) => (!type || t.type === type))
      .filter((t) => (!from || t.scheduledAt >= from))
      .filter((t) => (!to || t.scheduledAt <= to));
  }

  patchTask(user: RequestUser, id: string, payload: Partial<TaskRecord>) {
    const task = this.enforceCompany(user, this.tasks.find((t) => t.id === id), 'task');
    Object.assign(task, payload, { updatedAt: now(), id: task.id, companyId: task.companyId });
    return task;
  }

  completeTask(user: RequestUser, id: string) {
    return this.patchTask(user, id, { status: 'DONE' });
  }

  exportFactoryPackage(user: RequestUser, orderId: string) {
    const order = this.enforceCompany(user, this.orders.find((o) => o.id === orderId), 'order');
    const bundle = {
      order,
      items: this.orderItems.filter((i) => i.orderId === orderId && i.companyId === user.companyId),
      openings: this.openings.filter((o) => o.orderId === orderId && o.companyId === user.companyId),
      documents: this.documents.filter((d) => d.orderId === orderId && d.companyId === user.companyId).map((d) => ({ id: d.id, type: d.type, status: d.status })),
    };
    const docs = this.documents.filter((d) => d.orderId === orderId && d.companyId === user.companyId && (d.type === 'OFFER' || d.type === 'SPEC'));
    const files = this.files.filter((f) => f.companyId === user.companyId && ((f.entityType === 'order' && f.entityId === orderId) || (f.entityType === 'opening' && bundle.openings.some((o) => o.id === f.entityId))));
    const payload = {
      bundle,
      documents: docs.map((d) => ({ type: d.type, content: readFileSync(d.fileUrl, 'utf-8') })),
      files: files.map((f) => ({ id: f.id, content: readFileSync(f.fileUrl, 'utf-8') })),
    };
    const outPath = join(process.cwd(), 'storage', `${orderId}-factory-package.zip`);
    writeFileSync(outPath, gzipSync(Buffer.from(JSON.stringify(payload, null, 2), 'utf-8')));
    this.generateDocument(user, orderId, 'SPEC');
    this.log(user, 'Order', orderId, 'ORDER_EXPORTED_FACTORY_PACKAGE', { package: { before: null, after: outPath } });
    return { fileUrl: outPath };
  }

  listAudit(user: RequestUser, entityId?: string) {
    return this.auditLogs.filter((a) => a.companyId === user.companyId).filter((a) => (!entityId || a.entityId === entityId));
  }
}
