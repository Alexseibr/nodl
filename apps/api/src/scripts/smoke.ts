import { OrderOsService } from '../modules/order-os/order-os.service';

const svc = new OrderOsService();
const owner = { id: 'usr_owner', companyId: 'cmp_demo', role: 'OWNER' as const };

const manager = svc.createUser(owner, { fullName: 'M', email: 'm@test.local', role: 'MANAGER' });
const lead = svc.createLead(owner, { name: 'Client', phone: '+123' });
const address = svc.createAddress(owner, { city: 'Minsk', line1: 'Main 1' });
const order = svc.convertLeadToOrder(owner, lead.id, address.id);
svc.createOpening(owner, { addressId: address.id, measuredAt: new Date().toISOString(), measuredBy: manager.id, widthMm: 1000, heightMm: 1200, type: 'WINDOW', orderId: order.id });
svc.setOrderStatus(owner, order.id, 'MEASURED');
svc.addOrderItem(owner, order.id, { type: 'WINDOW', title: 'Item', qty: 2, attributes: { profile: 'A' }, priceFactory: 100 });
svc.setOrderStatus(owner, order.id, 'OFFER_CREATED');
svc.generateDocument(owner, order.id, 'OFFER');
svc.setOrderStatus(owner, order.id, 'OFFER_SENT');
svc.patchOrder(owner, order.id, { status: 'CONFIRMED', factoryCompanyId: 'factory-1' });
svc.exportFactoryPackage(owner, order.id);
console.log('smoke-ok');
