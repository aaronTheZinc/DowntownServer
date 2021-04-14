import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import {Client} from '../models/types'


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: string;

} 