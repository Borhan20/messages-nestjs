import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth/api/v1/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/sign-up')
    async creatUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.email, body.password);
    }

    @Get('/all') // Specific route comes first
    async getUsers() {
        return this.usersService.getUsers();
    }

    @Get('/:id') // Generic route comes after
    async getUser(@Param('id') id: number) {
        return this.usersService.getUser(id);
      
    }

    @Put('/:id')
    async updateUsers(@Param('id') id: number, @Body() updateBody: CreateUserDto) {
        return this.usersService.updateUser(id, updateBody);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number){
        this.usersService.removeUser(id);
    }
}
