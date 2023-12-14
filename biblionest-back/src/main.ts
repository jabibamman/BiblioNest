import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  AppModule.setupEnv();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Biblionest")
    .setDescription("The Biblionest API description")
    .setVersion("1.0")
    .addTag("biblionest")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.BACK_PORT || 3000);
}
bootstrap();
