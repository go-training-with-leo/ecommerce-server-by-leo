import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult, Repository } from 'typeorm';

import { Product } from './entities/product.entity';

import type {
  GotProductDto,
  CreateProductDto,
  UpdateProductDto,
  CreatedProductDto,
  UpdatedProductDto,
} from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  public async create(
    productInfo: CreateProductDto,
  ): Promise<CreatedProductDto> {
    const createdProduct = await this.productRepository.create(productInfo);

    await this.productRepository.save(createdProduct);

    return createdProduct;
  }

  public async getAll(): Promise<GotProductDto[]> {
    const products = await this.productRepository.find();

    return products;
  }

  public async getById(id: string): Promise<GotProductDto> {
    const product = await this.productRepository.findOneBy({ id });

    return product;
  }

  public async updateById({
    id,
    updateInfo,
  }: {
    id: string;
    updateInfo: UpdateProductDto;
  }): Promise<UpdatedProductDto> {
    const product = await this.productRepository.findOneBy({ id });

    const updatedProduct = await this.productRepository.create({
      ...product,
      ...updateInfo,
    });

    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.productRepository.delete({ id });
  }
}
