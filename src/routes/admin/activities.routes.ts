import * as activityController from '../../controllers/activity.controller';
import { createAdminCrudRouter } from '../../utils/adminCrudRouter';

export default createAdminCrudRouter(activityController);
