import { Injectable, NotFoundException  } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity'; 
import { UserRepository } from 'src/users/repository/user.repository'; 
import { UsersService } from '../users.service'; 
@Injectable()
export class UsersServiceImpl implements UsersService {

    async find(email: string) {
        return await this.repo.findOne({where:{email}})
    }

    constructor(@InjectRepository(User) private repo: UserRepository){
       
    }

    async create(email: string, password: string){
        console.log(password)
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
        if (!user){
            throw new NotFoundException("user not found");
        }
        this.repo.remove(user)
    }
}
