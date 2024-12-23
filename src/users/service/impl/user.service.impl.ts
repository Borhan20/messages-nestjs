import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { UserRepository } from '../../repository/user.repository';
import { UsersService } from '../users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(private repo: UserRepository) {}

  async find(email: string) {
      return await this.repo.findOne({ where: { email } });
  }

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }

  async getUser(id: number) {
    return await this.repo.findOne({ where: { id }, cache: false });
  }

  async getUsers() {
    const users = await this.repo.find();
    return { users: users };
  }
  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({ where: { id }, cache: false });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return await this.repo.save(user);
    // return await this.repo.update(id,{email:attr.email} )
  }

  async removeUser(id: number) {
    const user = await this.repo.findOne({ where: { id }, cache: false });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    this.repo.remove(user);
  }
}
