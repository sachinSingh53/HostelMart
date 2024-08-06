import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,UploadedFiles,UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private readonly cloudinaryService: CloudinaryService
    ){}

    @Get()
    async getAllProduct(){
        return await this.productService.getAllProduct()
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images', 10))
    async createProduct(@Body() dto:ProductDto,@UploadedFiles() files: Express.Multer.File[]){
        //TODO: upload files
        if (files) {
            const results = await this.cloudinaryService.uploadImages(files);
            const photoUrls = results.map(result => (result as { secure_url: string }).secure_url);
            dto.photos = photoUrls;
        }
        
        const product = await this.productService.createProduct(dto)
        return product;
    }

    @Get(':id')
    async getProductById(@Param('id',ParseIntPipe)id:number){
        const product = await this.productService.getProductById(id);
        return product;
    }

    @Patch(':id')
    async updateProduct(@Param('id',ParseIntPipe) id:number, @Body() data){
        const updatedProduct = await this.productService.updateProduct(id,data)
        return {
            message: 'data updated successfully',
            updatedProduct
        }
    }
    @Delete(':id')
    async deleteProduct(@Param('id',ParseIntPipe) id:number){
        await this.productService.deleteProduct(id);
        return {
            message: 'product deleted successfully'
        }
    }
    
}
