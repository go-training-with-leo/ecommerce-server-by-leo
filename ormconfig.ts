import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import type { DataSourceOptions } from 'typeorm';

import { isDevelopmentEnv } from '@/utils/helpers';

config();

const configService = new ConfigService();

const dataSourceConfig: DataSourceOptions & {
  ssl?: { rejectUnauthorized: boolean };
} = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  logging: false,
  synchronize: false,
  entities: [`${__dirname}/src/api/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/src/database/migrations/**/*{.ts,.js}`],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: {
    rejectUnauthorized: false,
  },
};

if (!isDevelopmentEnv()) {
  dataSourceConfig.ssl.rejectUnauthorized = false;
}

/**
 * * I am trying to enhance config because I want to use configuration in config folder
 * * But that is asynchronous function, so I am not using it. In the future, I will find a better solution
 * * Please tell me if you have a solution
 */
export const AppDataSource = new DataSource(dataSourceConfig);
