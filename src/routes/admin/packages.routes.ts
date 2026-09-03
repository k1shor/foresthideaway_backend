import * as packageController from '../../controllers/package.controller';
import { createAdminCrudRouter } from '../../utils/adminCrudRouter';

export default createAdminCrudRouter(packageController);
