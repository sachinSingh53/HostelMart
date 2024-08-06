import { Global, Module } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryConfig } from '../config/cloudinary.config';
import { CloudinaryService } from './cloudinary.service';


@Global()
@Module({
    imports: [
        MulterModule.register({
          storage: new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
              folder: 'hostel_mart_product_images', // Cloudinary folder name
              format: async (req, file) => 'png', // Format (like png or jpg)
              public_id: (req, file) => file.originalname, // Public ID (file name)
            } as any, // Type assertion for the params
          }),
        }),
      ],
    providers: [CloudinaryService],
    exports:[CloudinaryService]
    
})
export class CloudinaryModule {
  constructor() {
    cloudinary.config(CloudinaryConfig); // Ensure Cloudinary is configured
  }
}
