import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Client } from "../models/types";
import { Address } from "../models/types";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  shop!: string;

  @Column()
  authId!: string;

  @Column("simple-array")
  purchased!: string[];

  @Column("simple-array")
  bookMarked!: string[];

  @Column("simple-json")
  address!: Address;

  @Column("simple-json")
  stripe!: Object;
}
