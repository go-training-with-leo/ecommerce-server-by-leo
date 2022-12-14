import { InjectRepository } from '@nestjs/typeorm';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { DeleteResult, Repository } from 'typeorm';

import { CreateInventoryDto } from '@/api/inventory/dto';
import { CategoryService } from '@/api/category/category.service';
import { DiscountService } from '@/api/discount/discount.service';
import { InventoryService } from '@/api/inventory/inventory.service';

import { Product } from './entities/product.entity';

import type {
  GotProductDto,
  CreateProductDto,
  UpdateProductDto,
  CreatedProductDto,
  UpdatedProductDto,
  GotProductDetailDto,
  AddedDiscountProductDto,
  AddedInventoryProductDto,
} from './dto';
import { Size } from '@/common/enums';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @Inject(forwardRef(() => InventoryService))
    private inventoryService: InventoryService,

    private discountService: DiscountService,
    private categoryService: CategoryService,
  ) {}

  public async create(
    productInfo: CreateProductDto,
  ): Promise<CreatedProductDto> {
    const category = await this.categoryService.getBasicById(
      productInfo?.category,
    );

    const createdProduct = await this.productRepository.create({
      ...productInfo,
      category,
    });

    await this.productRepository.save(createdProduct);

    return createdProduct;
  }

  public async getAll(): Promise<GotProductDetailDto[]> {
    const products = await this.productRepository.find({
      relations: {
        discount: true,
        category: true,
        inventories: {
          detailInvoiceItems: true,
        },
      },
    });

    return products.map((product) => product.toResponse());
  }

  public async getById(id: string): Promise<GotProductDetailDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { discount: true, category: true, inventories: true },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product.toResponse();
  }

  public async getBasicById(id: string): Promise<GotProductDetailDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { discount: true, category: true },
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
    const product = await this.getBasicById(id);

    const category =
      (await this.categoryService.getBasicById(updateInfo?.category)) ||
      product?.category;

    const updatedProduct = await this.productRepository.create({
      ...product,
      ...updateInfo,
      category,
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

    const product = await this.getBasicById(id);

    const addedDiscountProduct = await this.productRepository.create({
      ...product,
      discount,
    });

    await this.productRepository.save(addedDiscountProduct);

    return addedDiscountProduct;
  }

  public async addInventory({
    id,
    inventoryInfo,
  }: {
    id: string;
    inventoryInfo: CreateInventoryDto;
  }): Promise<AddedInventoryProductDto> {
    const product = await this.getBasicById(id);

    const inventory = await this.inventoryService.getByInfo({
      condition: {
        product: {
          id,
        },
        size: Size[inventoryInfo?.size],
      },
    });

    if (inventory) {
      await this.inventoryService.updateById({
        id: inventory?.id,
        updateInfo: {
          quantity: inventoryInfo?.quantity + inventory?.quantity,
        },
      });
    } else {
      await this.inventoryService.create({
        product,
        inventoryInfo,
      });
    }

    const addedInventoryProduct = await this.getById(id);

    return addedInventoryProduct;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.productRepository.delete({ id });
  }
}
