import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import {
  GotInventoryDto,
  UpdateInventoryDto,
  UpdatedInventoryDto,
  GotInventoryDetailDto,
} from './dto';
import inventoryRoutes from './inventory.routes';
import { InventoryService } from './inventory.service';

@InjectController({ name: inventoryRoutes.index })
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @InjectRoute(inventoryRoutes.getAll)
  public async getAll(): Promise<GotInventoryDto[]> {
    const gotInventories = await this.inventoryService.getAll();

    return gotInventories;
  }

  @InjectRoute(inventoryRoutes.getById)
  public async getById(
    @Param('id') id: string,
  ): Promise<GotInventoryDetailDto> {
    const gotInventory = await this.inventoryService.getById(id);

    return gotInventory;
  }

  @InjectRoute(inventoryRoutes.updateById)
  public async updateById(
    @Param('id') id: string,
    @Body() updateInfo: UpdateInventoryDto,
  ): Promise<UpdatedInventoryDto> {
    const updatedInventory = await this.inventoryService.updateInternalById({
      id,
      updateInfo,
    });

    return updatedInventory;
  }

  @InjectRoute(inventoryRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.inventoryService.deleteById(id);

    return id;
  }
}
