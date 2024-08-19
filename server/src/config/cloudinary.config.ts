import { v2 as cloudinary } from 'cloudinary';
import { ConfigOptions } from 'cloudinary';

export const CloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

// cloudinary.config(CloudinaryConfig);
