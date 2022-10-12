import { Time } from '@/utils/constants';

export const config = {
  db: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,

    database: process.env.DB_NAME || 'dbname',
    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',

    entities: [`${__dirname}/../../api/**/*.entity.{js,ts}`],

    logging: false,
    synchronize: false,
    autoLoadEntities: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  code: {
    resetPassword: {
      lifetime: 5 * Time.ONE_MINUTE,
    },
  },
  email: {
    transport: {
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.MAIL_USERNAME || 'username',
        pass: process.env.MAIL_PASSWORD || 'password',
      },
    },
    options: {
      from: `"E-Commerce Training" <${process.env.MAIL_USERNAME}>`,
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
