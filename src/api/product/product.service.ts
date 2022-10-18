import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import type { DeleteResult, Repository } from 'typeorm';

import { DiscountService } from '@/api/discount/discount.service';

import { Product } from './entities/product.entity';

import type {
  GotProductDto,
  CreateProductDto,
  UpdateProductDto,
  CreatedProductDto,
  UpdatedProductDto,
  AddedDiscountProductDto,
} from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private discountService: DiscountService,
  ) {}

  public async create(
    productInfo: CreateProductDto,
  ): Promise<CreatedProductDto> {
    const createdProduct = await this.productRepository.create(productInfo);

    await this.productRepository.save(createdProduct);

    return createdProduct;
  }

  public async getAll(): Promise<GotProductDto[]> {
    const products = await this.productRepository.find({
      relations: { discount: true },
    });

    return products;
  }

  public async getById(id: string): Promise<GotProductDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { discount: true },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  public async updateById({
    id,
    updateInfo,
  }: {
    id: string;
    updateInfo: UpdateProductDto;
  }): Promise<UpdatedProductDto> {
    const product = await this.getById(id);

    const updatedProduct = await this.productRepository.create({
      ...product,
      ...updateInfo,
    });

    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  public async addDiscount({
    id,
    discountId,
  }: {
    id: string;
    discountId: string;
  }): Promise<AddedDiscountProductDto> {
    const discount = await this.discountService.getBasicById(discountId);

    const product = await this.getById(id);

    const addedDiscountProduct = await this.productRepository.create({
      ...product,
      discount,
    });

    await this.productRepository.save(addedDiscountProduct);

    return addedDiscountProduct;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.productRepository.delete({ id });
  }
}
