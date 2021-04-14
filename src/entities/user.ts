import { Entity } from "typeorm";

@Entity()
export class Photo {
    id!: number;
    name!: string;
    description!: string;
    filename!: string;
    views!: number;
    isPublished?: boolean;
}