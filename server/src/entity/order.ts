import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Client, Address } from "../models";
import { Product } from "./product";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  customer!: string;

  @Column()
  product!: string;

  @Column()
  address!: Address;
}
