import { Package } from '../models/package.model';
import { createCrudController } from '../utils/crudFactory';

export const {
  publicList,
  publicGet,
  adminList,
  adminGet,
  adminCreate,
  adminUpdate,
  adminDelete,
} = createCrudController(Package);
