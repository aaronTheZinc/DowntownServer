import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Client } from "../models/types";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  price!: string;

  @Column()
  description!: string;

  @Column()
  thumbnail!: string;

  @Column("simple-array")
  images!: string[];

  @Column()
  shop!: string
}
