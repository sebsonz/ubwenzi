import "reflect-metadata";
import { resolve } from "node:path";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import dotenv from "dotenv";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

// Load the API-local environment file before Nest creates providers.
// Existing process environment variables take precedence over .env values.
dotenv.config({
  path: resolve(__dirname, "../.env"),
});

async function bootstrap(): Promise<void> {
  const adapter = new FastifyAdapter({
    logger: true,
    trustProxy: false,
    bodyLimit: 1_048_576,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    { bufferLogs: true },
  );

  app.enableShutdownHooks();
  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: (process.env.CORS_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? "0.0.0.0";
  await app.listen(port, host);
}

void bootstrap();
