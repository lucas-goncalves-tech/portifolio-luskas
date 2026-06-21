import { Router } from 'express';
import { ReportsController } from '../controllers/reports.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const controller = new ReportsController();

router.get('/', controller.list);
router.get('/:id', controller.get);

router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

export default router;
