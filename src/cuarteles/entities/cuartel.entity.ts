import { CampoEspecifico } from 'src/campo-especifico/entities/campo-especifico.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
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
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
