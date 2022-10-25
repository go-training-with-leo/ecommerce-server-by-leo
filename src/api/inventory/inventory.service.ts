import {
  Inject,
  forwardRef,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GotProductDto } from '@/api/product/dto';
import { ProductService } from '@/api/product/product.service';

import { Inventory } from './entities';

import type {
  GotInventoryDto,
  CreateInventoryDto,
  UpdateInventoryDto,
  CreatedInventoryDto,
  UpdatedInventoryDto,
  GotInventoryDetailDto,
} from './dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,

    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  public async create({
    product,
    inventoryInfo,
  }: {
    product: GotProductDto;
    inventoryInfo: CreateInventoryDto;
  }): Promise<CreatedInventoryDto> {
    const createdInventory = this.inventoryRepository.create({
      ...inventoryInfo,
      product,
    });

    await this.inventoryRepository.save(createdInventory);

    return createdInventory;
  }

  public async createWithProductId({
    productId,
    inventoryInfo,
  }: {
    productId: string;
    inventoryInfo: CreateInventoryDto;
  }): Promise<CreatedInventoryDto> {
    const product = await this.productService.getBasicById(productId);

    const createdInventory = this.inventoryRepository.create({
      ...inventoryInfo,
      product,
    });

    await this.inventoryRepository.save(createdInventory);

    return createdInventory;
  }

  public async getAll(): Promise<GotInventoryDto[]> {
    const inventories = await this.inventoryRepository.find({
      relations: {
        product: true,
      },
    });

    return inventories.map((inventory) => inventory.toResponse());
  }

  public async getById(id: string): Promise<GotInventoryDetailDto> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    if (!inventory) {
      throw new NotFoundException();
    }

    return inventory.toResponse();
  }

  public async getByInfo({
    condition = {},
    relations = {},
  }): Promise<GotInventoryDto> {
    const inventory = await this.inventoryRepository.findOne({
      where: condition,
      relations,
    });

    return inventory;
  }

  public async updateById({
    id,
    updateInfo,
  }: {
    id: string;
    updateInfo: UpdateInventoryDto;
  }): Promise<UpdatedInventoryDto> {
    const inventory = await this.getById(id);

    const updatedInventory = await this.inventoryRepository.create({
      ...inventory,
      ...updateInfo,
    });

    await this.inventoryRepository.save(updatedInventory);

    return updatedInventory;
  }

  public async updateInternalById({
    id,
    updateInfo,
  }: {
    id: string;
    updateInfo: UpdateInventoryDto;
  }): Promise<UpdatedInventoryDto> {
    const inventory = await this.getById(id);

    if (!inventory) {
      throw new NotFoundException();
    }

    const updatedInventory = await this.inventoryRepository.create({
      ...inventory,
      ...updateInfo,
    });

    await this.inventoryRepository.save(updatedInventory);

    return updatedInventory.toResponse();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    await this.getById(id);

    return this.inventoryRepository.delete({ id });
  }
}
