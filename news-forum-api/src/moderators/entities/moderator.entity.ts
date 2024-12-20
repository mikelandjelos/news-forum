import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Moderator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Index()
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Index()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'enum', enum: ['m', 'f'] })
  gender: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
