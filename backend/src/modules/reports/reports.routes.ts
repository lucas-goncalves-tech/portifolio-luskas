import { container } from 'tsyringe';
import { Router } from 'express';
import { ReportsController } from './reports.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();
const controller = container.resolve(ReportsController);

router.get('/', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.get(req, res));

router.post('/', authMiddleware, (req, res) => controller.create(req, res));
router.put('/:id', authMiddleware, (req, res) => controller.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => controller.delete(req, res));

export default router;
