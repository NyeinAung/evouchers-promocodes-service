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
export class Evoucher extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;

    @Column({ type: 'date' })
    expiry_date: Date;

    @Column()
    image: string;

    @Column()
    amount: number;

    @Column()
    quantity: number;

    @Column()
    payment_method: number;

    @Column({ default: 1 })
    buy_type: number;

    @Column()
    name: string;

    @Column()
    phone_no: string;

    @Column()
    maximum_gift_limit: number;

    @Column()
    maximum_limit: number;

    @Column()
    is_active: number;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
}