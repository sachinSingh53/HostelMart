import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService) { }
    async getAllProduct() {
        return await this.prismaService.product.findMany();
    }

    async createProduct(data:ProductDto){
        const product = await this.prismaService.product.create({data})
        return product;
    }

    async getProductById(id:number){
        const product = await this.prismaService.product.findUnique({
            where:{
                id
            }
        })

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }
    async updateProduct(id:number,data){
        const updatedProduct = await this.prismaService.product.update({
            where:{
                id
            },
            data
        })

        return updatedProduct;
    }
    async deleteProduct(id:number){
        return await this.prismaService.product.delete({
            where:{
                id
            }
        })
    }
}
