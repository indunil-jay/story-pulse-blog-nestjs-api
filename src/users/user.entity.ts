import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './enums/users.roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'timestamp',
  })
  dataOfBirth?: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 256, nullable: true })
  bio?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  profileImage?: string;
}
