import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { ControlCalidad } from './control-calidad.entity';
import { ControlCalidadDefecto } from './control-calidad-defecto.entity';


export const TIPO_DEFECTO = ['CALIDAD','CONDICION'] as const
export type TipoDefecto = (typeof TIPO_DEFECTO)[number];

@Entity({ name: 'defectos' })
export class Defecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('enum', { enum: TIPO_DEFECTO, default: TIPO_DEFECTO[0] })
  tipo: TipoDefecto;

  @OneToMany(() => ControlCalidadDefecto, (ccd) => ccd.defecto)
  usosEnControles: ControlCalidadDefecto[]
  
  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
