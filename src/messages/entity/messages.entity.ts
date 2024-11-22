import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";

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

    @Column({ type: 'datetime', default: () => "datetime('now')" })
    createdAt: Date

}