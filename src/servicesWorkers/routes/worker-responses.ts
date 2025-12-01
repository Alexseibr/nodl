import { Router } from 'express';
import { WorkerResponseModel } from '../models/WorkerResponse';
import { WorkerOrderModel } from '../models/WorkerOrder';
import { WorkerModel } from '../models/Worker';
import { buildChatRoomId } from '../services/WorkerEngine';

export const workerResponsesRouter = Router();

workerResponsesRouter.get('/:orderId', async (req, res, next) => {
  try {
    const responses = await WorkerResponseModel.find({ orderId: req.params.orderId }).lean();
    res.json(responses);
  } catch (error) {
    next(error);
  }
});

workerResponsesRouter.post('/:orderId', async (req, res, next) => {
  try {
    const payload = { ...req.body, orderId: req.params.orderId };
    const response = await WorkerResponseModel.create(payload);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

workerResponsesRouter.post('/:orderId/:responseId/accept', async (req, res, next) => {
  try {
    const response = await WorkerResponseModel.findById(req.params.responseId);
    if (!response) {
      res.status(404).json({ message: 'Response not found' });
      return;
    }
    const order = await WorkerOrderModel.findById(response.orderId);
    const worker = await WorkerModel.findById(response.workerId);
    if (!order || !worker) {
      res.status(400).json({ message: 'Order or worker not found' });
      return;
    }
    response.status = 'accepted';
    order.assignedWorkerId = worker._id.toString();
    order.status = 'in_progress';
    await Promise.all([
      response.save(),
      order.save(),
      WorkerResponseModel.updateMany(
        { orderId: response.orderId, _id: { $ne: response._id } },
        { status: 'rejected' }
      ),
    ]);
    res.json({
      response,
      order,
      chatRoom: buildChatRoomId(order._id.toString()),
    });
  } catch (error) {
    next(error);
  }
});

export default workerResponsesRouter;
