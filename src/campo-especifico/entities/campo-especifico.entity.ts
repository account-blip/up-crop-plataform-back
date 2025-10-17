import { Campo } from 'src/campo/entities/campo.entity';
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
  
  @Entity({ name: 'campo_especifico' })
  export class CampoEspecifico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    nombre: string;

    @ManyToOne(() => Campo, (campo) => campo.campoEspecificos, {onDelete: 'CASCADE'})
    campo: Campo;

    @OneToMany(() => Cuartel, (cuartel) => cuartel.campoEspecifico, { cascade: true })
    cuarteles: Cuartel[]

    @OneToMany(() => EstimacionDeCosecha, (estimacionDeCosecha) => estimacionDeCosecha.campoEspecifico, { cascade: true })
    estimacionesDeCosecha: EstimacionDeCosecha[];
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
