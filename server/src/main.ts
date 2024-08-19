import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // const hasSubPath = process.env.SUB_PATH !== undefined;
  // const UrlPrefix = hasSubPath ? process.env.SUB_PATH : '';

  const BASE_PATH = '/api/v1';

  // Exclude these endpoints from prefix. These endpoints are required for health checks.
  // const pathsToExclude = [];
  // if (hasSubPath) {
  //   pathsToExclude.push({ path: '/', method: RequestMethod.GET });
  // }
  // pathsToExclude.push({ path: '/health', method: RequestMethod.GET });
  // pathsToExclude.push({ path: '/api/health', method: RequestMethod.GET });

  app.setGlobalPrefix(BASE_PATH, {
    // exclude: pathsToExclude,
  });
  app.enableCors({
    origin: true,
    credentials: true,
  });
  // app.use(compression());
  await app.listen(4000);
}
bootstrap();
