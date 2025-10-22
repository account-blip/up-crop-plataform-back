import { UnidadesProductiva } from 'src/unidades-productivas/entities/unidades-productiva.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'empresa' })
  export class Empresa {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    nombre: string;

    @OneToMany(() => User, (user) => user.empresa, { cascade: true })
    users: User[]

    @OneToMany(() => UnidadesProductiva, (unidadesProductiva) => unidadesProductiva.empresa, { cascade: true })
    unidadesProductiva: UnidadesProductiva[]
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
