import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountModule } from '@/api/discount/discount.module';
import { InventoryModule } from '@/api/inventory/inventory.module';

import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';

@Module({
  imports: [
    DiscountModule,
    forwardRef(() => InventoryModule),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
