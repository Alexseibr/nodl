import { Router } from 'express';
import { WorkerOrderModel } from '../models/WorkerOrder';
import { findMatchesForOrder } from '../services/WorkerMatching';
import { buildChatRoomId } from '../services/WorkerEngine';

export const workerOrdersRouter = Router();

workerOrdersRouter.get('/', async (req, res, next) => {
  try {
    const { status, category } = req.query;
    const filters: Record<string, unknown> = {};
    if (status) filters.status = status;
    if (category) filters.category = category;
    const orders = await WorkerOrderModel.find(filters).lean();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

workerOrdersRouter.get('/:id', async (req, res, next) => {
  try {
    const order = await WorkerOrderModel.findById(req.params.id).lean();
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

workerOrdersRouter.post('/', async (req, res, next) => {
  try {
    const order = await WorkerOrderModel.create(req.body);
    const matches = await findMatchesForOrder(order);
    res.status(201).json({ order, matches });
  } catch (error) {
    next(error);
  }
});

workerOrdersRouter.put('/:id', async (req, res, next) => {
  try {
    const order = await WorkerOrderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

workerOrdersRouter.post('/:id/close', async (req, res, next) => {
  try {
    const order = await WorkerOrderModel.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    await order.closeOrder();
    res.json({ order, chatRoom: buildChatRoomId(order._id.toString()) });
  } catch (error) {
    next(error);
  }
});
