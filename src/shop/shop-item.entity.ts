import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Product } from '../types/shop'; // Data Mapper => Active Record (implements Product => extends BaseEntity)

@Entity()
export class ShopItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 10000,
    default: '',
  })
  desc: string;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: 0,
  })
  boughtCounter: number;

  @Column({
    default: false,
  })
  wasEverBought: boolean;
}
