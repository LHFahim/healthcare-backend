import 'dotenv/config';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const logger = new Logger('Server is starting up!');
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.PORT ?? 5000;

  const validationPipe = new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    transform: true,
    transformOptions: {
      enableCircularCheck: true,
      exposeDefaultValues: true,
    },
  });

  app.useGlobalPipes(validationPipe);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Healthcare backend')
    .setDescription('Healthcare backend API description')
    .addBearerAuth({
      description: 'JWT Token',
      type: 'http',
      name: 'Authorization',
      bearerFormat: 'JWT',
    })
    .setVersion('1.0')
    .addTag('Healthcare backend')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      syntaxHighlight: {
        activate: true,
        theme: 'obsidian',
      },
      docExpansion: 'none',
      displayRequestDuration: true,
      defaultModelExpandDepth: 8,
      defaultModelsExpandDepth: 8,
    },
    customSiteTitle: 'Healthcare backend API Docs',
  });

  app.enableCors({
    origin: '*',
  });

  await app.listen(PORT);

  logger.log(`Server started on http://localhost:${PORT}/api`);
}
bootstrap();
