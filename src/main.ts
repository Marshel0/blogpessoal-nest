import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00' //Arruma o fuso horario

  app.useGlobalPipes(new ValidationPipe()); //Cria o construtor e habilita para validações de dados

  app.enableCors(); //Habilita para aceitar requisições de servidores de outras origens e não só onde está hospedado 

  await app.listen(4000);
}
bootstrap();
