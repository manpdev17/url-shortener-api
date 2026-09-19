import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service.js';
import { UrlsController } from './urls.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/urls.entity.js';

@Module({
	imports: [
		TypeOrmModule.forFeature([Url])
	],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
