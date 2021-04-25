import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Client, Address } from "../models/types";
import { Product } from "./product";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  customer!: string;

  @Column()
  transaction!: string;

  @Column()
  product!: string;

  @Column()
  address!: Address;
}
