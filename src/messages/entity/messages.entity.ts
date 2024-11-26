import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Message{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    content: string;

    @Column({ type: 'int'})
    user: number

    @Column({ type: 'int' })
    friend: number

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP",})
    createdAt: Timestamp

}