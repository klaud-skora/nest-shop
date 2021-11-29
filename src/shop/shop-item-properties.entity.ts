import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Entity()
export class ShopItemProperties extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 15,
  })
  color: string;

  @Column()
  width: number;

  @OneToOne((type) => ShopItem)
  product: ShopItem;
}