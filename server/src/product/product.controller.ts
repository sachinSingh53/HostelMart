import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get()
    async getAllProduct(){
        // return await this.productService.getAllProduct();
    }
}
