import { Time } from '@/utils/constants';

export const config = {
  db: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,

    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',

    entities: [`${__dirname}/../../api/**/*.entity.{js,ts}`],

    logging: false,
    synchronize: false,
    autoLoadEntities: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  token: {
    verification: {
      lifetime: 2 * Time.ONE_HOUR,
    },
  },
  email: {
    transport: {
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'example@gmail.com',
        pass: 'example.password',
      },
    },
    options: {
      from: '"Example Name" <example@gmail.com>',
    },
  },
  swagger: {
    siteTitle: 'E-Commerce Training | Documentation',
    title: 'E-Commerce Training | Documentation',
    description: 'The E-Commerce Training API Documentation',
    version: '1.0',
    bearerAuth: {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer',
      bearerFormat: 'Bearer',
      name: 'Authorization',
      description: 'Please enter JWT token',
    },
  },
};
