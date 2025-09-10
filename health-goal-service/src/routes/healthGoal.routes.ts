import { Router } from 'express';
import { body, param } from 'express-validator';
import * as ctrl from '../controllers/healthGoal.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { requireAuth } from '../middlewares/auth.middleware';

const r = Router();

r.post('/', [
  body('title').trim().isLength({ min: 3 }).withMessage('title min 3'),
  body('targetDate').isISO8601().withMessage('targetDate ISO date required')
], validateRequest, requireAuth, ctrl.create);

r.get('/', requireAuth, ctrl.list);

r.put('/:id', [
  param('id').isMongoId().withMessage('invalid id')
], validateRequest, requireAuth, ctrl.update);

r.delete('/:id', [ param('id').isMongoId() ], validateRequest, requireAuth, ctrl.remove);

export default r;
