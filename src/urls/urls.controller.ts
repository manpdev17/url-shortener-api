import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlsService } from './urls.service.js';
import { CreateUrlDto } from './dto/create-url.dto.js';
import { Url } from './entities/urls.entity.js';
import { Throttle } from '@nestjs/throttler';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiGoneResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiServiceUnavailableResponse, ApiTags, ApiTooManyRequestsResponse } from '@nestjs/swagger';
import { UrlResponseDto } from './dto/urls-response.dto.js';
import { UrlStatsResponseDto } from './dto/url-stats-response.dto.js';

@ApiTags('URLs')
@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiCreatedResponse({
	  description: 'Short URL created successfully',
	  type: UrlResponseDto
  })
  @ApiBadRequestResponse({
	  description: 'Invalid URL or invalid expiration date'
  })
  @ApiServiceUnavailableResponse({
	  description: 'Could not generate a unique short code'
  })
  @ApiTooManyRequestsResponse({
	  description: 'Too many requests'
  })
  async createNewUrl(@Body() dto: CreateUrlDto) {
	return this.urlsService.create(dto);
  }

  @ApiTooManyRequestsResponse({
	  description: 'Too many requests'
  })
  @ApiNotFoundResponse({
	  description: 'URL not found'
  })
  @ApiOkResponse({
	  description: 'URL statistics retrieved successfully',
	  type: UrlStatsResponseDto
  })

  @Get(':shortCode/stats')
  async getStats(@Param('shortCode') shortCode: string) {
	  return this.urlsService.getStats(shortCode)
  }

  @ApiTooManyRequestsResponse({
	  description: 'Too many requests'
  })
  @ApiNotFoundResponse({
	  description: 'The URL was not found'
  })
  @ApiGoneResponse({
	  description: 'The URL has expired'
  })
  @ApiResponse({
	  status: 302,
	  description: 'Redirects to the original URL'
  })

  @Get(':shortCode')
  @Redirect()
  async getByShortCode(@Param('shortCode') shortCode: string) {
	  const url: Url = await this.urlsService.getUrl(shortCode);

	  return {
		  url: url.originalUrl,
		  statusCode: 302
	  }
  }
}
