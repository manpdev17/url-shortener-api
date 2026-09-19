import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator'


export class CreateUrlDto {
	@ApiProperty({
		example: 'https://example.com',
		description: 'The original URL to shorten'
	})
	@IsUrl()
	@IsNotEmpty()
	originalUrl: string;
	
	@ApiPropertyOptional({
		example: '2026-12-31T23:59:59.000Z',
		description: 'Expiration date of the shortened URL'
	})
	@IsOptional()
	@IsDateString()
	expiresAt?: string
}
