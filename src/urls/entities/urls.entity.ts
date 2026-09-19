import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('urls')
export class Url {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text' })
	originalUrl: string;

	@Column({ type: 'varchar', length: 21, unique: true })
	shortCode: string;

	@Column({ type: 'timestamptz', nullable: true })
	expiresAt: Date | null;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ type: 'int', default: 0 })
	clicks: number;
}
