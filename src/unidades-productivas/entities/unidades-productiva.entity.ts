import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Cuartel } from 'src/cuarteles/entities/cuartel.entity';
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
  
  @Entity({ name: 'unidades_productivas' })
  export class UnidadesProductiva {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    nombre: string;

    @ManyToOne(() => Empresa, (empresa) => empresa.unidadesProductiva, {onDelete: 'CASCADE'})
    empresa: Empresa;

    @OneToMany(() => Cuartel, (cuartel) => cuartel.unidadesProductiva, { cascade: true })
    cuarteles: Cuartel[]

    @OneToMany(() => EstimacionDeCosecha, (estimacionDeCosecha) => estimacionDeCosecha.unidadesProductiva, { cascade: true })
    estimacionesDeCosecha: EstimacionDeCosecha[];
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
