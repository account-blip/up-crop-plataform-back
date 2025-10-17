import { CampoEspecifico } from 'src/campo-especifico/entities/campo-especifico.entity';
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
  
  @Entity({ name: 'cuarteles' })
  export class Cuartel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    nombre: string;

    @ManyToOne(() => CampoEspecifico, (campoEspecifico) => campoEspecifico.cuarteles, {onDelete: 'CASCADE'})
    campoEspecifico: CampoEspecifico;
  
    @OneToMany(() => EstimacionDeCosecha, (estimacionDeCosecha) => estimacionDeCosecha.cuartel, { cascade: true })
    estimacionesDeCosecha: EstimacionDeCosecha[];

    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
