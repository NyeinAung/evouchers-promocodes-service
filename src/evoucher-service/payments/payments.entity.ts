import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity()
export class Payments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    evoucher_id: number;
  
    @Column()
    payment_method_id: number;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}