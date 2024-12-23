import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { UsersServiceImpl } from './user.service.impl';
import { AuthService } from '../auth.service';

const scrypt = promisify(_script);

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private usersService: UsersServiceImpl) {}

  async signup(email: string, password: string) {
    //See if email is in use
    const user = await this.usersService.find(email);
    console.log(user);
    if (user) {
      throw new BadRequestException('email in use');
    }

    //Hash the users password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    //create a new user and save it
      return await this.usersService.create(email, result);
  }

  async signin(email: string, password: string) {
    //See if email is in use
    const user = await this.usersService.find(email);
    console.log(user);
    if (user == null) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash != hash.toString('hex')) {
      throw new UnauthorizedException('you are not authorized');
    }

    return user;
  }
}