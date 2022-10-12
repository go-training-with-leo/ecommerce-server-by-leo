import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(
          '🚀 ~ file: database.module.ts ~ line 12 ~ configService.ge',
          configService.get('db'),
        );
        return configService.get('db');
      },
    }),
  ],
})
export class DatabaseModule {}
