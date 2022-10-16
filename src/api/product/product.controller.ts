import { Body, Param } from '@nestjs/common';
import { InjectController, InjectRoute } from '@/decorators';

import productRoutes from './product.routes';
import { ProductService } from './product.service';

import { CreateProductDto, UpdateProductDto } from './dto';

import type {
  GotProductDto,
  CreatedProductDto,
  UpdatedProductDto,
} from './dto';

@InjectController({ name: productRoutes.index })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @InjectRoute(productRoutes.create)
  public async create(
    @Body() productInfo: CreateProductDto,
  ): Promise<CreatedProductDto> {
    const createdProduct = await this.productService.create(productInfo);

    return createdProduct;
  }

  @InjectRoute(productRoutes.getAll)
  public async getAll(): Promise<GotProductDto[]> {
    const gotProducts = await this.productService.getAll();

    return gotProducts;
  }

  @InjectRoute(productRoutes.getById)
  public async getById(@Param('id') uid: string): Promise<GotProductDto> {
    const gotProduct = await this.productService.getById(uid);

    return gotProduct;
  }

  @InjectRoute(productRoutes.updateById)
  public async updateById(
    @Param('id') uid: string,
    @Body() updateInfo: UpdateProductDto,
  ): Promise<UpdatedProductDto> {
    const updatedProduct = await this.productService.updateById({
      id: uid,
      updateInfo,
    });

    return updatedProduct;
  }

  @InjectRoute(productRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.productService.deleteById(id);

    return id;
  }
}
