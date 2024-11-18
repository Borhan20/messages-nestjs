import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService]
})
export class MessagesModule {}
