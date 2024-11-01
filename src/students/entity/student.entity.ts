import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryColumn()
  sbd: string;

  @Column('float',{ nullable: true })
  toan: number;

  @Column('float', { nullable: true })
  ngu_van: number;

  @Column('float', { nullable: true })
  ngoai_ngu: number;

  @Column('float', { nullable: true })
  vat_li: number;

  @Column('float', { nullable: true })
  hoa_hoc: number;

  @Column('float', { nullable: true })
  sinh_hoc: number;

  @Column('float', { nullable: true })
  lich_su: number;

  @Column('float', { nullable: true })
  dia_li: number;

  @Column('float', { nullable: true })
  gdcd: number;

  @Column({ nullable: true })
  ma_ngoai_ngu: string;
}
