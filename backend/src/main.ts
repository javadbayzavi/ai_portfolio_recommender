import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    //This origin set by default but for a real project it should be specifically defined
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  //Add a global validation pipeline
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.listen(process.env.SERVER_PORT || 3000);
};

bootstrap();