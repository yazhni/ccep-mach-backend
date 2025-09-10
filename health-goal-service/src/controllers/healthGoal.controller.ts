import { Request, Response, NextFunction } from 'express';
import HealthGoal from '../models/healthGoal.model';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const payload = { ...req.body, userId };
    const doc = await HealthGoal.create(payload);
    res.status(201).json(doc);
  } catch (err) { next(err); }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const docs = await HealthGoal.find({ userId }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const doc = await HealthGoal.findOneAndUpdate({ _id: req.params.id, userId }, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const doc = await HealthGoal.findOneAndDelete({ _id: req.params.id, userId });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'deleted' });
  } catch (err) { next(err); }
};
