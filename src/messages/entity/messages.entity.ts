import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    user: number

    @Column()
    friend: number
}