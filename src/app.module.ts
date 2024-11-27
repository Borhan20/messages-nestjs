import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from '../db/data-source';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(DataSourceOption),
    // TypeOrmModule.forRoot({
      // // type: 'sqlite',
      // // database: 'db.sqlite',
      // type: 'postgres',
      // database: 'postgres',
      // port: 5432,
      // password: 'postgres',
      // username: 'postgres',
      // schema: 'core',
      // entities: [User, Message],
      // migrations: ['db/migrations/*{.ts,.js}'],
      // synchronize: true,
      // logging: true,
      // migrationsRun:false
    // }),
    UsersModule,
    MessagesModule,
  ],
})
export class AppModule {}
