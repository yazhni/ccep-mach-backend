import { Router } from 'express';
import { body } from 'express-validator';
import * as ctrl from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { requireAuth } from '../middlewares/auth.middleware';

const r = Router();

r.post('/register', [
  body('name').trim().isLength({ min: 3 }).withMessage('name min 3'),
  body('email').isEmail().withMessage('valid email required'),
  body('password').isLength({ min: 6 }).withMessage('password min 6')
], validateRequest, ctrl.register);

r.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], validateRequest, ctrl.login);

r.get('/me', requireAuth, ctrl.me);

export default r;
