import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { Message } from './messages/entity/messages.entity';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      // type: 'sqlite',
      // database: 'db.sqlite',
      type: 'postgres',
      database: 'postgres',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User, Message],
      synchronize: true,
      logging: true
    }),
    UsersModule,
    MessagesModule
  ]
})
export class AppModule {}
