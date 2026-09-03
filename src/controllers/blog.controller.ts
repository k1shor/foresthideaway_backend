import { Blog } from '../models/blog.model';
import { createCrudController } from '../utils/crudFactory';

export const {
  publicList,
  publicGet,
  adminList,
  adminGet,
  adminCreate,
  adminUpdate,
  adminDelete,
} = createCrudController(Blog);
