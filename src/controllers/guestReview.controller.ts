import { GuestReview } from '../models/guestReview.model';
import { createCrudController } from '../utils/crudFactory';

// No public detail route: guest reviews have no slug/detail page, only a public list.
export const {
  publicList,
  adminList,
  adminGet,
  adminCreate,
  adminUpdate,
  adminDelete,
} = createCrudController(GuestReview, { hasSlug: false });
