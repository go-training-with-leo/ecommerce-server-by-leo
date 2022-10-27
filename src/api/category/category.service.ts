import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './entities';

import type {
  GotCategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdatedCategoryDto,
  GotCategoryDetailDto,
} from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  public async create(categoryInfo: CreateCategoryDto): Promise<Category> {
    const createdCategory = this.categoryRepository.create(categoryInfo);

    await this.categoryRepository.save(createdCategory);

    return createdCategory;
  }

  public async getAll(): Promise<GotCategoryDto[]> {
    const categories = await this.categoryRepository.find();

    return categories;
  }

  public async getBasicById(id: string): Promise<GotCategoryDetailDto> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  public async getById(id: string): Promise<GotCategoryDetailDto> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  public async updateById({
    id,
    updateInfo,
  }: {
    id: string;
    updateInfo: UpdateCategoryDto;
  }): Promise<UpdatedCategoryDto> {
    const category = await this.getBasicById(id);

    const updatedCategory = await this.categoryRepository.create({
      ...category,
      ...updateInfo,
    });

    await this.categoryRepository.save(updatedCategory);

    return updatedCategory;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    await this.getById(id);

    return this.categoryRepository.delete({ id });
  }
}
