import { register, login, me } from '../controllers/user.controller';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('user.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      (User.create as jest.Mock).mockResolvedValue({ _id: '1', name: 'n', email: 'e' });
      const req = { body: { name: 'n', email: 'e', password: 'p' } };
      const res = mockRes();
      await register(req as any, res, mockNext);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'e' });
      expect(bcrypt.hash).toHaveBeenCalledWith('p', 10);
      expect(User.create).toHaveBeenCalledWith({ name: 'n', email: 'e', password: 'hashed' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'n', email: 'e' });
    });

    it('should not register if email exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ _id: '1' });
      const req = { body: { name: 'n', email: 'e', password: 'p' } };
      const res = mockRes();
      await register(req as any, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email already in use' });
    });
  });

  describe('login', () => {
    it('should return 400 if missing fields', async () => {
      const req = { body: { email: '', password: '' } };
      const res = mockRes();
      await login(req as any, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required' });
    });

    it('should return 404 if user not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const req = { body: { email: 'e', password: 'p' } };
      const res = mockRes();
      await login(req as any, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found. Please register first.' });
    });

    it('should return 401 if password does not match', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const req = { body: { email: 'e', password: 'p' } };
      const res = mockRes();
      await login(req as any, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should login and return token', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ _id: '1', email: 'e', password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');
      const req = { body: { email: 'e', password: 'p' } };
      const res = mockRes();
      await login(req as any, res, mockNext);
      expect(res.json).toHaveBeenCalledWith({ token: 'token', message: 'Login successful' });
    });
  });

  describe('me', () => {
    it('should return user data', async () => {
      (User.findById as jest.Mock).mockReturnValue({ select: jest.fn().mockResolvedValue({ _id: '1', name: 'n' }) });
      const req = { userId: '1' };
      const res = mockRes();
      await me(req as any, res, mockNext);
      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ _id: '1', name: 'n' });
    });

    it('should return 404 if user not found', async () => {
      (User.findById as jest.Mock).mockReturnValue({ select: jest.fn().mockResolvedValue(null) });
      const req = { userId: '1' };
      const res = mockRes();
      await me(req as any, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
    });
  });
});