import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Message } from '../entity/messages.entity'; 
import { CustomRepository } from '../../database/typeorm-ex.decorators';

@Injectable()
@CustomRepository(Message)
export class MessagesRepository extends Repository<Message> {
    
    // constructor(private dataSource: DataSource) {
    //     super(Message, dataSource.createEntityManager());
    //   }
      
    async findByUserFriend(user: number, friend: number) {
        const messages = await this.find({
            where: [
              { user: user, friend: friend },
              { user: friend, friend: user },
            ],
            order: {
                createdAt: 'ASC', // Use 'DESC' for descending order
              },
          });
        // const messages = await this.query(
        //     'SELECT *'+ 
        //     'FROM message '+
        //     'WHERE (user = :user AND friend = :friend)'+ 
        //        'OR (user = :friend AND friend = :user)'+
        //     'ORDER BY createdAt ASC;'
        //     ,[user, friend ]
                
        // )
        return messages
    }
}