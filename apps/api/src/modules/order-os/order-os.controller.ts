import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CurrentUser, Roles } from '../common/auth';
import { OrderOsService } from './order-os.service';
import { RequestUser } from './types';


@Controller()
export class OrderOsController {
  constructor(private readonly service: OrderOsService) {}

  @Get('auth/me')
  me(@CurrentUser() user: RequestUser) { return this.service.me(user); }

  @Get('users') @Roles('OWNER')
  users(@CurrentUser() user: RequestUser) { return this.service.usersList(user); }

  @Post('users') @Roles('OWNER')
  createUser(@CurrentUser() user: RequestUser, @Body() body: { fullName: string; email: string; role: RequestUser['role'] }) { return this.service.createUser(user, body); }

  @Patch('users/:id') @Roles('OWNER')
  patchUser(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: { fullName?: string; email?: string; role?: RequestUser['role'] }) { return this.service.patchUser(user, id, body); }

  @Post('users/:id/disable') @Roles('OWNER')
  disable(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.disableUser(user, id); }

  @Get('leads')
  leads(@CurrentUser() user: RequestUser, @Query('q') q?: string, @Query('status') status?: string, @Query('assignedTo') assignedTo?: string) { return this.service.listLeads(user, q, status, assignedTo); }

  @Post('leads')
  createLead(@CurrentUser() user: RequestUser, @Body() body: { name: string; phone: string; notes?: string }) { return this.service.createLead(user, body); }

  @Get('leads/:id')
  getLead(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.getLead(user, id); }

  @Patch('leads/:id')
  patchLead(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: Record<string, unknown>) { return this.service.patchLead(user, id, body as never); }

  @Post('leads/:id/assign')
  assignLead(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: { assignedTo: string }) { return this.service.assignLead(user, id, body.assignedTo); }

  @Post('leads/:id/convert-to-order')
  convertLead(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: { addressId: string }) { return this.service.convertLeadToOrder(user, id, body.addressId); }

  @Post('addresses')
  createAddress(@CurrentUser() user: RequestUser, @Body() body: { city: string; line1: string; lat?: number; lng?: number }) { return this.service.createAddress(user, body); }

  @Post('openings')
  createOpening(@CurrentUser() user: RequestUser, @Body() body: { widthMm: number; heightMm: number; type: string; addressId: string; measuredBy: string; measuredAt: string; orderId?: string; comment?: string }) { return this.service.createOpening(user, body); }

  @Get('openings')
  openings(@CurrentUser() user: RequestUser, @Query('addressId') addressId?: string, @Query('orderId') orderId?: string) { return this.service.listOpenings(user, addressId, orderId); }

  @Get('openings/:id')
  opening(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.getOpening(user, id); }

  @Patch('openings/:id')
  patchOpening(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: Record<string, unknown>) { return this.service.patchOpening(user, id, body as never); }

  @Post('openings/:id/attach-file')
  attachOpening(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: { filename: string; content: string }) { return this.service.attachFile(user, 'opening', id, body.content, body.filename); }

  @Get('orders')
  orders(@CurrentUser() user: RequestUser, @Query('status') status?: string, @Query('payment') payment?: string, @Query('assignedTo') assignedTo?: string, @Query('q') q?: string) {
    return this.service.listOrders(user, status, payment, assignedTo, q);
  }

  @Post('orders')
  createOrder(@CurrentUser() user: RequestUser, @Body() body: { leadId?: string; addressId: string; factoryCompanyId?: string }) { return this.service.createOrder(user, body); }

  @Get('orders/:id')
  getOrder(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.getOrder(user, id); }

  @Patch('orders/:id')
  patchOrder(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: Record<string, unknown>) { return this.service.patchOrder(user, id, body as never); }

  @Post('orders/:id/assign')
  assignOrder(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: { assignedTo: string }) { return this.service.assignOrder(user, id, body.assignedTo); }

  @Post('orders/:id/status')
  setStatus(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: { status: never }) { return this.service.setOrderStatus(user, id, body.status); }

  @Post('orders/:id/recalculate')
  @Roles('OWNER', 'MANAGER')
  recalculate(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.recalculate(user, id); }

  @Post('orders/:id/items')
  @Roles('OWNER', 'MANAGER')
  addItem(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: { openingId?: string; type: 'WINDOW' | 'DOOR'; title: string; qty: number; attributes: Record<string, unknown>; priceFactory: number; priceDealer?: number }) {
    return this.service.addOrderItem(user, id, body);
  }

  @Patch('orders/:id/items/:itemId')
  @Roles('OWNER', 'MANAGER')
  patchItem(@CurrentUser() user: RequestUser, @Param('id') id: string, @Param('itemId') itemId: string, @Body() body: Record<string, unknown>) { return this.service.patchOrderItem(user, id, itemId, body as never); }

  @Delete('orders/:id/items/:itemId')
  @Roles('OWNER', 'MANAGER')
  removeItem(@CurrentUser() user: RequestUser, @Param('id') id: string, @Param('itemId') itemId: string) { return this.service.removeOrderItem(user, id, itemId); }

  @Post('orders/:id/documents/generate')
  generate(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: { type: 'OFFER' | 'INVOICE' | 'CONTRACT' | 'SPEC' | 'ACT' }) { return this.service.generateDocument(user, id, body.type); }

  @Get('orders/:id/documents')
  docs(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.listDocuments(user, id); }

  @Post('documents/:id/finalize')
  finalize(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.finalizeDocument(user, id); }

  @Get('tasks')
  tasks(@CurrentUser() user: RequestUser, @Query('from') from?: string, @Query('to') to?: string, @Query('assignedTo') assignedTo?: string, @Query('type') type?: string) {
    return this.service.listTasks(user, from, to, assignedTo, type);
  }

  @Post('tasks')
  createTask(@CurrentUser() user: RequestUser, @Body() body: { orderId?: string; type: 'MEASURE' | 'INSTALL' | 'CALL'; scheduledAt: string; assignedTo: string; status: 'PLANNED' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'; note?: string }) { return this.service.createTask(user, body); }

  @Patch('tasks/:id')
  patchTask(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: Record<string, unknown>) { return this.service.patchTask(user, id, body as never); }

  @Post('tasks/:id/complete')
  completeTask(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.completeTask(user, id); }

  @Post('pricing-rules')
  createRule(@CurrentUser() user: RequestUser, @Body() body: { ruleType: 'PERCENT' | 'FIXED' | 'COEFFICIENT'; value: number; scope?: Record<string, unknown> }) { return this.service.createPricingRule(user, body); }

  @Get('pricing-rules')
  rules(@CurrentUser() user: RequestUser) { return this.service.listPricingRules(user); }

  @Patch('pricing-rules/:id')
  patchRule(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() body: Record<string, unknown>) { return this.service.patchPricingRule(user, id, body as never); }

  @Post('orders/:id/export/factory-package')
  exportFactory(@CurrentUser() user: RequestUser, @Param('id') id: string) { return this.service.exportFactoryPackage(user, id); }

  @Get('audit-logs')
  audit(@CurrentUser() user: RequestUser, @Query('entityId') entityId?: string) { return this.service.listAudit(user, entityId); }
}
