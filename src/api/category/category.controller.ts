import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import categoryRoutes from './category.routes';
import { CategoryService } from './category.service';
import {
  GotCategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  CreatedCategoryDto,
  UpdatedCategoryDto,
  GotCategoryDetailDto,
} from './dto';

@InjectController({ name: categoryRoutes.index })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @InjectRoute(categoryRoutes.create)
  public async create(
    @Body() categoryInfo: CreateCategoryDto,
  ): Promise<CreatedCategoryDto> {
    const createdCategory = await this.categoryService.create(categoryInfo);

    return createdCategory;
  }

  @InjectRoute(categoryRoutes.getAll)
  public async getAll(): Promise<GotCategoryDto[]> {
    const gotCategories = await this.categoryService.getAll();

    return gotCategories;
  }

  @InjectRoute(categoryRoutes.getById)
  public async getById(@Param('id') id: string): Promise<GotCategoryDetailDto> {
    const gotCategory = await this.categoryService.getById(id);

    return gotCategory;
  }

  @InjectRoute(categoryRoutes.updateById)
  public async updateById(
    @Param('id') id: string,
    @Body() updateInfo: UpdateCategoryDto,
  ): Promise<UpdatedCategoryDto> {
    const updatedCategory = await this.categoryService.updateById({
      id,

      updateInfo,
    });

    return updatedCategory;
  }

  @InjectRoute(categoryRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.categoryService.deleteById(id);

    return id;
  }
}
