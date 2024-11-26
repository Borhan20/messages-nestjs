import { Module } from '@nestjs/common';
import { MessagesController } from './controller/messages.controller'; 
import { MessagesService } from './service/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity/messages.entity';
import { MessagesServiceImpl } from './service/impl/messages.service.impl';
import { MessagesRepository } from './repository/messages.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Message]),
    TypeOrmExModule.forCustomRepository([MessagesRepository])
  ],
  controllers: [MessagesController],
  providers: [
    MessagesServiceImpl,
    // MessagesRepository
  ],
  exports: [MessagesServiceImpl]
})
export class MessagesModule {}
