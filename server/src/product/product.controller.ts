import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get()
    async getAllProduct(){
        return await this.productService.getAllProduct()
    }

    @Post()
    async createProduct(@Body() dto:ProductDto){
        //TODO: upload files
        
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
