import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Marcelo Henrique", "https://github.com/Marshel0", "mah_henrique4478@hotmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00'; //Arruma o fuso horario

  app.useGlobalPipes(new ValidationPipe()); //Cria o construtor e habilita para validações de dados

  app.enableCors(); //Habilita para aceitar requisições de servidores de outras origens e não só onde está hospedado 

  await app.listen(process.env.PORT || 4001);
}
bootstrap();
