import { Router } from 'express';
import { WorkerModel } from '../models/Worker';
import { WorkerOrderModel } from '../models/WorkerOrder';
import { WorkerPortfolioModel } from '../models/WorkerPortfolio';
import { findMatchesForOrder } from '../services/WorkerMatching';

export const workersRouter = Router();

workersRouter.get('/', async (req, res, next) => {
  try {
    const { category, city, minRating, tags } = req.query;
    const filters: Record<string, unknown> = {};
    if (category) filters.categories = category;
    if (city) filters.city = city;
    if (minRating) filters.rating = { $gte: Number(minRating) };
    if (tags) filters.tags = { $in: (tags as string).split(',') };
    const workers = await WorkerModel.find(filters).lean();
    res.json(workers);
  } catch (error) {
    next(error);
  }
});

workersRouter.get('/:id', async (req, res, next) => {
  try {
    const worker = await WorkerModel.findById(req.params.id).populate('portfolio').lean();
    if (!worker) {
      res.status(404).json({ message: 'Worker not found' });
      return;
    }
    res.json(worker);
  } catch (error) {
    next(error);
  }
});

workersRouter.post('/', async (req, res, next) => {
  try {
    const worker = await WorkerModel.create(req.body);
    res.status(201).json(worker);
  } catch (error) {
    next(error);
  }
});

workersRouter.put('/:id', async (req, res, next) => {
  try {
    const worker = await WorkerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(worker);
  } catch (error) {
    next(error);
  }
});

workersRouter.get('/:id/orders/recommended', async (req, res, next) => {
  try {
    const worker = await WorkerModel.findById(req.params.id);
    if (!worker) {
      res.status(404).json({ message: 'Worker not found' });
      return;
    }
    const orders = await worker.getRecommendedOrders();
    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

workersRouter.get('/:id/portfolio', async (req, res, next) => {
  try {
    const portfolio = await WorkerPortfolioModel.find({ workerId: req.params.id }).lean();
    res.json({ items: portfolio });
  } catch (error) {
    next(error);
  }
});

workersRouter.post('/:id/portfolio', async (req, res, next) => {
  try {
    const entry = await WorkerPortfolioModel.create({ ...req.body, workerId: req.params.id });
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

workersRouter.get('/order/:orderId/matches', async (req, res, next) => {
  try {
    const order = await WorkerOrderModel.findById(req.params.orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    const matches = await findMatchesForOrder(order);
    res.json(matches);
  } catch (error) {
    next(error);
  }
});
