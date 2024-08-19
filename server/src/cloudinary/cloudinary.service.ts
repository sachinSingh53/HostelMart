import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImages(files: Express.Multer.File[]) {
    // console.log(files);

    const uploadPromises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          // Upload the buffer to Cloudinary
          cloudinary.uploader
            .upload_stream(
              {
                folder: 'hostel_mart_product_images',
                public_id: file.originalname,
                format: file.mimetype.split('/')[1], // Extract file extension from mimetype
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              },
            )
            .end(file.buffer); // Directly pass the buffer
        }),
    );

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.log('Error in uploading images:', error);
      throw error; // Optionally, rethrow the error or handle it as needed
    }
  }
}
