import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, BeforeRemove } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @AfterInsert()
    logInsert(){
        console.log('Inserted User with id: ', this.id)
    }
    @AfterUpdate()
    logUpdate(){
        console.log('Updated User with id: ', this.id)
    }
    @BeforeRemove()
    logRemove(){
        console.log('Removed User with id: ', this.id)
    }
}