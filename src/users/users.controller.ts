import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/auth/sign-up')
    async creatUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.email, body.password);
    }

    @Get('/auth/all') // Specific route comes first
    async getUsers() {
        return this.usersService.getUsers();
    }

    @Get('/auth/:id') // Generic route comes after
    async getUser(@Param('id') id: number) {
        return this.usersService.getUser(id);
      
    }

    @Put('/auth/:id')
    async updateUsers(@Param('id') id: number, @Body() updateBody: CreateUserDto) {
        return this.usersService.updateUser(id, updateBody);
    }
}
