import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
	  new ValidationPipe({
		  transform: true,
		  whitelist: true
	  })
  )
  const config = new DocumentBuilder()	
  	.setTitle("URL Shortener API")
	.setDescription("API for shortening URLs")
	.setVersion("1.0")
	.build()

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('docs', app, document)
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
