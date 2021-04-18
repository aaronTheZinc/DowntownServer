import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Client } from "../models/types";

@Entity()
export class Product extends BaseEntity {
  @Column()
  id!: string;

  @Column()
  title!: string;

  @Column()
  price!: string;

  @Column()
  description!: string;

  @Column("simple-array")
  images!: string[];

  @Column()
  shop!: string
}
