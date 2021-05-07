import { title } from "node:process";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  title!: string;
  @Column()
  profileImageUrl!: string;

  @Column("simple-array")
  products!: string[];

  @Column("simple-array")
  orders!: string[];

  @Column()
  shop_owner!: string;

  @Column()
  availableBal!: number

}
