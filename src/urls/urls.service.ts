import { BadRequestException, GoneException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/urls.entity.js';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';	
import { CreateUrlDto } from './dto/create-url.dto.js';


@Injectable()
export class UrlsService {
	constructor(
		@InjectRepository(Url)
		private readonly urlRepository: Repository<Url>,
	) { }

	async create(dto: CreateUrlDto) {
		if(dto.expiresAt) {
			const expiresAt = new Date(dto.expiresAt)
			if(expiresAt <= new Date()) {
				throw new BadRequestException("expiresAt must be a future date")
			}
		}
		const originalUrl = dto.originalUrl;
		for(let attempt = 0; attempt < 5; attempt++) {
			const shortCode = nanoid(8);
			 const newUrl = this.urlRepository.create({
				 originalUrl,
				 shortCode,
				 expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null
			 });

			 try {
				 return await this.urlRepository.save(newUrl);
			 } catch(error: any) {
				 if(error.code !== '23505') {
					 throw error;
				 }
			 }
		}
		throw new ServiceUnavailableException("Could not generate a unique short code")
	}

	async getUrl(shortCode: string) {
		const url = await this.urlRepository.findOneBy({
			shortCode
		})
		if(!url) {
			throw new NotFoundException("URL not found")
		}

		if(url.expiresAt && url.expiresAt <= new Date()) {
			throw new GoneException("URL has expired");
		}

		await this.urlRepository.increment(
			{
				shortCode
			},
			'clicks',
			1
		)
		return url;
	}

	async getStats(shortCode: string) {
		const url = await this.urlRepository.findOneBy({
			shortCode
		})

		if(!url) {
			throw new NotFoundException("URL not found")
		}

		return {
			shortCode: url.shortCode,
			originalUrl: url.originalUrl,
			clicks: url.clicks,
			createdAt: url.createdAt,
			expiresAt: url.expiresAt,
			isExpired: url.expiresAt ? url.expiresAt <= new Date() : false
		}
	}
}
