import express, { RequestHandler } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';

interface AdminCrudControllers {
  adminList: RequestHandler;
  adminGet: RequestHandler;
  adminCreate: RequestHandler;
  adminUpdate: RequestHandler;
  adminDelete: RequestHandler;
}

export function createAdminCrudRouter(controllers: AdminCrudControllers) {
  const router = express.Router();

  router.use(protect, authorize('admin'));
  router.get('/', controllers.adminList);
  router.get('/:id', controllers.adminGet);
  router.post('/', controllers.adminCreate);
  router.put('/:id', controllers.adminUpdate);
  router.delete('/:id', controllers.adminDelete);

  return router;
}
