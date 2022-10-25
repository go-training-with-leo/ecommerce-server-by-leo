import { Body, Param } from '@nestjs/common';
import { InjectController, InjectRoute } from '@/decorators';

import productRoutes from './product.routes';
import { ProductService } from './product.service';

import {
  GotProductDto,
  UpdateProductDto,
  CreateProductDto,
  CreatedProductDto,
  UpdatedProductDto,
  AddDiscountProductDto,
  AddedDiscountProductDto,
  AddedInventoryProductDto,
} from './dto';
import { AddInventoryProductDto } from './dto/add-inventory-product.dto';

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
    @Param('id') id: string,
    @Body() updateInfo: UpdateProductDto,
  ): Promise<UpdatedProductDto> {
    const updatedProduct = await this.productService.updateById({
      id,
      updateInfo,
    });

    return updatedProduct;
  }

  @InjectRoute(productRoutes.addDiscountById)
  public async addDiscountById(
    @Param('id') id: string,
    @Body() addInfo: AddDiscountProductDto,
  ): Promise<AddedDiscountProductDto> {
    const { discountId } = addInfo;

    const addedDiscountProduct = await this.productService.addDiscount({
      id,
      discountId,
    });

    return addedDiscountProduct;
  }

  @InjectRoute(productRoutes.addInventoryById)
  public async addInventoryById(
    @Param('id') id: string,
    @Body() inventoryInfo: AddInventoryProductDto,
  ): Promise<AddedInventoryProductDto> {
    const createdInventory = await this.productService.addInventory({
      id,
      inventoryInfo,
    });

    return createdInventory;
  }

  @InjectRoute(productRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.productService.deleteById(id);

    return id;
  }
}
