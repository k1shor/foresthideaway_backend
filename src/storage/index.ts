import config from '../config/env';
import { ImageStorage } from './ImageStorage';
import { LocalDiskStorage } from './LocalDiskStorage';
import { CloudinaryStorage } from './CloudinaryStorage';

// No controller/route code references the concrete class directly.
const hasCloudinaryConfig = Boolean(
  config.cloudinaryCloudName && config.cloudinaryApiKey && config.cloudinaryApiSecret
);

const storage: ImageStorage = hasCloudinaryConfig ? new CloudinaryStorage() : new LocalDiskStorage();

export default storage;
