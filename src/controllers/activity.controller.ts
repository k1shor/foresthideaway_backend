import { Activity } from '../models/activity.model';
import { createCrudController } from '../utils/crudFactory';

export const {
  publicList,
  publicGet,
  adminList,
  adminGet,
  adminCreate,
  adminUpdate,
  adminDelete,
} = createCrudController(Activity);
