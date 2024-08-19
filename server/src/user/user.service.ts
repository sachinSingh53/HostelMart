import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BuyerDto, SellerDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  // Buyer's functions
  async createBuyer(dto: BuyerDto) {
    return await this.prismaService.buyer.create({ data: dto });
  }

  async updateBuyer(id: number, dto: BuyerDto) {
    return await this.prismaService.buyer.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async getBuyerById(id: number) {
    return await this.prismaService.buyer.findUnique({
      where: {
        id,
      },
    });
  }

  async getBuyerByUsername(username: string) {
    return await this.prismaService.buyer.findUnique({
      where: {
        username,
      },
    });
  }

  async getBuyerByEmail(email: string) {
    return await this.prismaService.buyer.findUnique({
      where: {
        email,
      },
    });
  }

  //Seller's function
  async createSeller(dto: SellerDto) {
    return await this.prismaService.seller.create({ data: dto });
  }

  async getSellerById(id: number) {
    return await this.prismaService.seller.findUnique({
      where: {
        id,
      },
    });
  }

  async getSellerByUsername(username: string) {
    return await this.prismaService.seller.findUnique({
      where: {
        username,
      },
    });
  }

  async getSellerByEmail(email: string) {
    return await this.prismaService.seller.findUnique({
      where: {
        email,
      },
    });
  }

  async updateSeller(id: number, dto: SellerDto) {
    return await this.prismaService.seller.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
