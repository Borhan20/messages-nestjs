import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from '../db/data-source';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    UsersModule,
    MessagesModule,
  ],
})
export class AppModule {}
