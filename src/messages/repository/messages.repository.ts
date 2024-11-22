import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Message } from '../entity/messages.entity'; 

@Injectable()
export class MessagesRepository extends Repository<Message> {

}