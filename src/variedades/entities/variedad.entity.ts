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
  
  @Entity({ name: 'variedades' })
  export class Variedad {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    nombre: string;
  
    @OneToMany(() => EstimacionDeCosecha, (estimacionDeCosecha) => estimacionDeCosecha.variedad, { cascade: true })
    estimacionesDeCosecha: EstimacionDeCosecha[];

    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
