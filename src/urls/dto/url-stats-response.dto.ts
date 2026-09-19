import { ApiProperty } from "@nestjs/swagger";

export class UrlStatsResponseDto {
	@ApiProperty()
	shortCode: string;

	@ApiProperty()
	originalUrl: string;

	@ApiProperty()
	clicks: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty({ nullable: true })
	expiresAt: Date | null;

	@ApiProperty()
	isExpired: boolean;
}
