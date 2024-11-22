import { Module } from '@nestjs/common';
import { MessagesController } from './controller/messages.controller'; 
import { MessagesService } from './service/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity/messages.entity';
import { MessagesServiceImpl } from './service/impl/messages.service.impl';
import { MessagesRepository } from './repository/messages.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [
    MessagesServiceImpl,
    MessagesRepository
  ],
  exports: [MessagesServiceImpl]
})
export class MessagesModule {}
