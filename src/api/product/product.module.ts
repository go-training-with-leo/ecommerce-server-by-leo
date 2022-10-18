import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountModule } from '@/api/discount/discount.module';

import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';

@Module({
  imports: [DiscountModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
