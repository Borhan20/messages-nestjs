import { Injectable, NotFoundException  } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repository/user.repository';


export interface UsersService {

    find(email:string);
    create(email: string, password: string);
    getUser(id: number)
    getUsers();
    updateUser(id: number, attrs: Partial<User>);
    removeUser(id:number);
}
