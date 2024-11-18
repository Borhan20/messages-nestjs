import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/auth/sign-up')
    creatUser(@Body() body: CreateUserDto){
        this.usersService.create(body.email, body.password);
    }

    
}
