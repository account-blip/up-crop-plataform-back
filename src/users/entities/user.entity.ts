import { Empresa } from 'src/empresas/entities/empresa.entity';
import { EstimacionDeCosecha } from 'src/estimaciones-de-cosecha/entities/estimacion-de-cosecha.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const USER_ROLES = ['SUPERADMIN','ADMIN', 'PRODUCTOR', 'INSPECTOR', 'BODEGA'] as const;
export type UserRole = (typeof USER_ROLES)[number];

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  @Index({ unique: true })
  username: string;

  @Column('varchar', { length: 255 })
  firstName: string;

  @Column('varchar', { length: 255 })
  lastName: string;

  @Column('varchar', { length: 255, unique: true })
  @Index({ unique: true })
  email: string;
  
  @Column('timestamp', { nullable: true })
  emailVerified: Date | null;

  @Column('varchar', { length: 255, nullable: true, select: false })
  password: string | null;

  @Column('enum', { enum: USER_ROLES, default: USER_ROLES[0] })
  role: UserRole;

  @ManyToOne(() => Empresa, (empresa) => empresa.users, {onDelete: 'CASCADE'})
  empresa: Empresa;

  @OneToMany(() => EstimacionDeCosecha, (estimacionDeCosecha) => estimacionDeCosecha.user, { cascade: true })
  estimacionesDeCosecha: EstimacionDeCosecha[];

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
