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
export class PurchaseHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    evoucher_id: number;

    @Column()
    qrcode: string;

    @Column()
    qrcode_image: string;
  
    @Column({ unique: true })
    promo_code: string;

    @Column()
    is_active: number;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}