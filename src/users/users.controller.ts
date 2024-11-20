import { Controller, Post, Get, Body, Param, Put, Delete, UseInterceptors, ClassSerializerInterceptor, Session, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth/api/v1/users')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService:AuthService
    ) {}

    @Get('/colors/:color')
    async setColor(@Param('color') color: string, @Session() session: any){
        session.color = color;
    }

    @Get('/colors')
    async getColor(@Session() session: any){
        return session.color;
    }

    @Post('/sign-up')
    async creatUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }


    @Post('/sign-in')
    async authenticateUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user =  await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }


    @Get('/all') // Specific route comes first
    async getUsers() {
        return this.usersService.getUsers();
    }

    
    @Get('/:id') // Generic route comes after
    async getUser(@Param('id') id: number, @Session() session: any) {
        if(session.userId != id){
            throw new ForbiddenException("you are forbidden for this request")
        }
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
