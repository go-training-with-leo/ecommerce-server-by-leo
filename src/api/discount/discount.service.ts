import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Discount } from './entities';

import type {
  GotDiscountDto,
  CreateDiscountDto,
  UpdateDiscountDto,
  UpdatedDiscountDto,
  GotDiscountDetailDto,
} from './dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  public async create(discountInfo: CreateDiscountDto): Promise<Discount> {
    const createdDiscount = this.discountRepository.create(discountInfo);

    await this.discountRepository.save(createdDiscount);

    return createdDiscount;
  }

  public async getAll(): Promise<GotDiscountDto[]> {
    const discounts = await this.discountRepository.find();

    return discounts;
  }

  public async getBasicById(id: string): Promise<GotDiscountDetailDto> {
    const discount = await this.discountRepository.findOne({
      where: { id },
    });

    if (!discount) {
      throw new NotFoundException();
    }

    return discount;
  }

  public async getById(id: string): Promise<GotDiscountDetailDto> {
    const discount = await this.discountRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    if (!discount) {
      throw new NotFoundException();
    }

    return discount;
  }

  public async updateById({
    id,
    updateInfo,
  }: {
    id: string;
    updateInfo: UpdateDiscountDto;
  }): Promise<UpdatedDiscountDto> {
    const discount = await this.getById(id);

    const updatedDiscount = await this.discountRepository.create({
      ...discount,
      ...updateInfo,
    });

    await this.discountRepository.save(updatedDiscount);

    return updatedDiscount;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    await this.getById(id);

    return this.discountRepository.delete({ id });
  }
}
