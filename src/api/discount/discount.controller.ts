import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import discountRoutes from './discount.routes';
import { DiscountService } from './discount.service';
import {
  GotDiscountDto,
  CreateDiscountDto,
  UpdateDiscountDto,
  CreatedDiscountDto,
  UpdatedDiscountDto,
  GotDiscountDetailDto,
} from './dto';

@InjectController({ name: discountRoutes.index })
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @InjectRoute(discountRoutes.create)
  public async create(
    @Body() discountInfo: CreateDiscountDto,
  ): Promise<CreatedDiscountDto> {
    const createdUser = await this.discountService.create(discountInfo);

    return createdUser;
  }

  @InjectRoute(discountRoutes.getAll)
  public async getAll(): Promise<GotDiscountDto[]> {
    const gotDiscountes = await this.discountService.getAll();

    return gotDiscountes;
  }

  @InjectRoute(discountRoutes.getById)
  public async getById(@Param('id') id: string): Promise<GotDiscountDetailDto> {
    const gotDiscount = await this.discountService.getById(id);

    return gotDiscount;
  }

  @InjectRoute(discountRoutes.updateById)
  public async updateById(
    @Param('id') id: string,
    @Body() updateInfo: UpdateDiscountDto,
  ): Promise<UpdatedDiscountDto> {
    const updatedDiscount = await this.discountService.updateById({
      id,

      updateInfo,
    });

    return updatedDiscount;
  }

  @InjectRoute(discountRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.discountService.deleteById(id);

    return id;
  }
}
