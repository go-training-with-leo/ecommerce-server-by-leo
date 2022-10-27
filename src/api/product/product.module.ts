import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@/api/category/category.module';
import { DiscountModule } from '@/api/discount/discount.module';
import { InventoryModule } from '@/api/inventory/inventory.module';

import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';

@Module({
  imports: [
    DiscountModule,
    CategoryModule,
    forwardRef(() => InventoryModule),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
