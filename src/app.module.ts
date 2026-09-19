import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsModule } from './urls/urls.module.js';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
	  ThrottlerModule.forRoot([
		  {
			  ttl: 60_000,
			  limit: 60
		  }
	  ]),
	  ConfigModule.forRoot({
		  isGlobal: true,
	  }),

	  TypeOrmModule.forRootAsync({
		  inject: [ConfigService],
		  useFactory: (configService: ConfigService) => ({
			  type: 'postgres',
			  host: configService.getOrThrow<string>('DB_HOST'),
			  port: Number(configService.getOrThrow<string>('DB_PORT')),
			  username: configService.getOrThrow<string>('DB_USERNAME'),
			  password: configService.getOrThrow<string>('DB_PASSWORD'),
			  database: configService.getOrThrow<string>('DB_NAME'),
			  autoLoadEntities: true,
			  synchronize: false
		  })
	  }),

	  UrlsModule,

  ],
  controllers: [],
  providers: [
	  {
		  provide: APP_GUARD,
		  useClass: ThrottlerGuard
	  }
  ],
})
export class AppModule {}
