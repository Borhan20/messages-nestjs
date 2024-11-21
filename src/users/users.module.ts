import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthService } from './service/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { UsersServiceImpl } from './service/impl/user.service.impl'; 

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersServiceImpl, AuthService, CurrentUserInterceptor],
  controllers: [UsersController],
  exports: [UsersServiceImpl]
})
export class UsersModule {}
