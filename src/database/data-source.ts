import 'reflect-metadata'

import 'dotenv/config'

import { DataSource } from 'typeorm'

import { Url } from '../urls/entities/urls.entity.js'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [Url],
	migrations: ['src/database/migrations/*.ts'],
	synchronize: false
})
