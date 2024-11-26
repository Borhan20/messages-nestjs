import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { UsersServiceImpl } from './service/impl/user.service.impl'; 
import { AuthServiceImpl } from './service/impl/auth.service.impl';
import { UserRepository } from './repository/user.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    // TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  providers: [
    UsersServiceImpl,
    UserRepository, 
    AuthServiceImpl, 
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ],
  controllers: [UsersController],
  exports: [UsersServiceImpl]
})
export class UsersModule {}
