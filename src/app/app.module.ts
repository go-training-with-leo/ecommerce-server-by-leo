import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from '@/config';
import { AppController } from './app.controller';

import { UserModule } from '@/api/user/user.module';
import { AuthModule } from '@/api/auth/auth.module';
import { TokenModule } from '@/api/token/token.module';
import { DatabaseModule } from '@/database/database.module';
import { ProductModule } from '@/api/product/product.module';
import { AddressModule } from '@/api/address/address.module';
import { InvoiceModule } from '@/api/invoice/invoice.module';
import { DiscountModule } from '@/api/discount/discount.module';
import { CategoryModule } from '@/api/category/category.module';
import { DetailInvoiceItem } from '@/api/detail-invoice-item/entities';
import { InventoryModule } from '@/api/inventory/inventory.module';

const EnvSchema = {
  PORT: Joi.number(),
  NODE_ENV: Joi.string(),
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
};

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object().keys(EnvSchema),
      load: [configuration],
    }),
    AuthModule,
    UserModule,
    TokenModule,
    ProductModule,
    AddressModule,
    InvoiceModule,
    DiscountModule,
    DatabaseModule,
    CategoryModule,
    InventoryModule,
    DetailInvoiceItem,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
