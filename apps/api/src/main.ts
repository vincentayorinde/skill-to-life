import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { validateConfig } from './config/config.validation';
import helmet from 'helmet';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  if (process.env['NODE_ENV'] === 'production') {
    validateConfig();
  }

  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: false, // Disabled — configured at CDN/reverse proxy level
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive');

    if (req.path === '/robots.txt') {
      res.type('text/plain').send('User-agent: *\nDisallow: /\n');
      return;
    }

    next();
  });

  const frontendUrl = process.env['FRONTEND_URL'] ?? 'http://localhost:4200';
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  app.setGlobalPrefix('api');

  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
