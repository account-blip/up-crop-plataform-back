import { EstimacionDeCosecha } from 'src/estimaciones-de-cosecha/entities/estimacion-de-cosecha.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'portainjertos' })
  export class Portainjerto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    nombre: string;
  
    @OneToMany(() => EstimacionDeCosecha, (estimacionDeCosecha) => estimacionDeCosecha.portainjerto, { cascade: true })
    estimacionesDeCosecha: EstimacionDeCosecha[]; 

    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  

