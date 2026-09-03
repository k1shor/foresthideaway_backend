import * as blogController from '../../controllers/blog.controller';
import { createAdminCrudRouter } from '../../utils/adminCrudRouter';

export default createAdminCrudRouter(blogController);
