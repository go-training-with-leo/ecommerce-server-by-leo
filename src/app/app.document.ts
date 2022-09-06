import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

import type { INestApplication } from '@nestjs/common';

import { configuration } from '@/config';

export const genAPIDocument = async (app: INestApplication): Promise<void> => {
  /**
   * * I used any at here because I can not get SecuritySchemeObject of swagger.
   * * If you have a better solution, Please tell me about that.
   */
  const config = await (<any>configuration());

  const documentConfig = new DocumentBuilder()
    .setTitle(config.swagger.title)
    .setVersion(config.swagger.version)
    .setDescription(config.swagger.description)
    .addBearerAuth(config.swagger.bearerAuth)
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(
    app,
    documentConfig,
    documentOptions,
  );

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: config.swagger.siteTitle,
  };

  SwaggerModule.setup('api/documentation', app, document, customOptions);
};
