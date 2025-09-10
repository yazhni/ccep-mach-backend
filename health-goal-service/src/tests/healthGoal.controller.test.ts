import { create, list, update, remove } from '../controllers/healthGoal.controller';
import HealthGoal from '../models/healthGoal.model';

jest.mock('../models/healthGoal.model');

const mockReq = (body = {}, params = {}, userId = 'user123') => ({
  body,
  params,
  userId,
});
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('healthGoal.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('create: should create and return a health goal', async () => {
    (HealthGoal.create as jest.Mock).mockResolvedValue({ _id: '1', name: 'goal', userId: 'user123' });
    const req = mockReq({ name: 'goal' });
    const res = mockRes();
    await create(req as any, res, mockNext);
    expect(HealthGoal.create).toHaveBeenCalledWith({ name: 'goal', userId: 'user123' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: '1', name: 'goal', userId: 'user123' });
  });

  it('list: should return user\'s health goals', async () => {
    (HealthGoal.find as jest.Mock).mockReturnValue({ sort: jest.fn().mockResolvedValue([{ _id: '1', userId: 'user123' }]) });
    const req = mockReq();
    const res = mockRes();
    await list(req as any, res, mockNext);
    expect(HealthGoal.find).toHaveBeenCalledWith({ userId: 'user123' });
    expect(res.json).toHaveBeenCalledWith([{ _id: '1', userId: 'user123' }]);
  });

  it('update: should update and return a health goal', async () => {
    (HealthGoal.findOneAndUpdate as jest.Mock).mockResolvedValue({ _id: '1', name: 'updated', userId: 'user123' });
    const req = mockReq({ name: 'updated' }, { id: '1' });
    const res = mockRes();
    await update(req as any, res, mockNext);
    expect(HealthGoal.findOneAndUpdate).toHaveBeenCalledWith({ _id: '1', userId: 'user123' }, { name: 'updated' }, { new: true });
    expect(res.json).toHaveBeenCalledWith({ _id: '1', name: 'updated', userId: 'user123' });
  });

  it('update: should return 404 if not found', async () => {
    (HealthGoal.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
    const req = mockReq({ name: 'updated' }, { id: '1' });
    const res = mockRes();
    await update(req as any, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
  });

  it('remove: should delete and return message', async () => {
    (HealthGoal.findOneAndDelete as jest.Mock).mockResolvedValue({ _id: '1', userId: 'user123' });
    const req = mockReq({}, { id: '1' });
    const res = mockRes();
    await remove(req as any, res, mockNext);
    expect(HealthGoal.findOneAndDelete).toHaveBeenCalledWith({ _id: '1', userId: 'user123' });
    expect(res.json).toHaveBeenCalledWith({ message: 'deleted' });
  });

  it('remove: should return 404 if not found', async () => {
    (HealthGoal.findOneAndDelete as jest.Mock).mockResolvedValue(null);
    const req = mockReq({}, { id: '1' });
    const res = mockRes();
    await remove(req as any, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
  });
});