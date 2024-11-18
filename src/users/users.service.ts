import { Injectable, NotFoundException  } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>){
       
    }

    async create(email: string, password: string){
        const user = this.repo.create({email, password});
        return await this.repo.save(user);
    }

    async getUser(id: number){
        return  await this.repo.findOne({where:{id}, cache:false});
        
    }

    async getUsers(){
        return await this.repo.find();
    }
    async updateUser(id: number, attrs: Partial<User>){
        const user = await this.repo.findOne({where:{id}, cache:false});
        if(!user){
            throw new NotFoundException("user not found");
        }
        Object.assign(user,attrs)
        return await this.repo.save(user)
        // return await this.repo.update(id,{email:attr.email} )
    }

    async removeUser(id:number){
        const user = await this.repo.findOne({where:{id}, cache:false});
        this.repo.remove(user)
    }
}
