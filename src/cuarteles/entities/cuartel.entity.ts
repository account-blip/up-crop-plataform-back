import { EstimacionDeCosecha } from 'src/estimaciones-de-cosecha/entities/estimacion-de-cosecha.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { UnidadesProductiva } from 'src/unidades-productivas/entities/unidades-productiva.entity';
  
  @Entity({ name: 'cuarteles' })
  export class Cuartel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    nombre: string;

    @ManyToOne(() => UnidadesProductiva, (unidadesProductiva) => unidadesProductiva.cuarteles, {onDelete: 'CASCADE'})
    unidadesProductiva: UnidadesProductiva;
  
    @OneToMany(() => EstimacionDeCosecha, (estimacionDeCosecha) => estimacionDeCosecha.cuartel, { cascade: true })
    estimacionesDeCosecha: EstimacionDeCosecha[];

    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
