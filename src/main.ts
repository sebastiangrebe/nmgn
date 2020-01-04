import { NestFactory } from '@nestjs/core';
import { RenderModule } from 'nest-next';
import Next from 'next';
import 'reflect-metadata';
import { AppModule } from './application.module';
import { RenderService } from 'nest-next';
import helmet from 'helmet';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  // Next.js setup when using custom web server instead of Next.js directly
  const dev = process.env.NODE_ENV !== 'production';
  const app = Next({ dev });

  // CSRF protection using cookie (only required for POST, PUT, DELETE requests sending the Authentication JWT inside a cookie)
  // CSRF Token has to be transmitted in HTTP Header
  const csrfProtection = csrf({ cookie: true })

  await app.prepare();

  // Setup NestJS
  const server = await NestFactory.create(AppModule);
  // Setup Express Helmet
  server.use(helmet());
  // Setup automatic cookie parsing
  server.use(cookieParser());
  // Add CSRF protection as described above
  server.use(csrfProtection);

  // Custom RenderModule provided by nest-next NPM package
  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  // Get the RenderService (NestJS Wrapper)
  const service = server.get(RenderService);

  // Send errors as given by server (not using Next.js for error pages)
  // @todo Check why it is not possible to use Next.js
  service.setErrorHandler(async (err, req, res) => {
    res.send(err.response);
  });

  // Read port from environment variables or use 3000 as default port
  const port = process.env.PORT || 3000;
  await server.listen(port);
}

bootstrap();
