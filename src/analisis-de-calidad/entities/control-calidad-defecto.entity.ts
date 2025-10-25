// control-calidad-defecto.entity.ts
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm'
import { ControlCalidad } from './control-calidad.entity'
import { Defecto } from './defecto.entity'

@Entity({ name: 'controles_calidad_defectos' })
export class ControlCalidadDefecto {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => ControlCalidad, (control) => control.defectosAsignados, { onDelete: 'CASCADE' })
  control: ControlCalidad

  @ManyToOne(() => Defecto, (defecto) => defecto.usosEnControles, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'defectoId' })
  defecto: Defecto

  @Column('int', { default: 0 })
  porcentaje: number
}
