import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from '../dtos/user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entity/user.entity';
import { UsersServiceImpl } from '../service/impl/user.service.impl';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthServiceImpl } from '../service/impl/auth.service.impl';
import { UserListDto } from '../dtos/user-list.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth/api/v1/users')
export class UsersController {
  constructor(
    private usersService: UsersServiceImpl,
    private authService: AuthServiceImpl,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UserDto })
  @Serialize(UserDto)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/sign-up')
  @ApiOkResponse({ type: UserDto })
  @Serialize(UserDto)
  async creatUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/sign-in')
  @ApiOkResponse({ type: UserDto })
  @Serialize(UserDto)
  async authenticateUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/sign-out')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/all')
  @ApiOkResponse({ type: UserListDto })
  // @UseGuards(AuthGuard)
  @Serialize(UserListDto) // Specific route comes first
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserDto })
  @UseGuards(AuthGuard)
  @Serialize(UserDto) // Generic route comes after
  async getUser(@Param('id') id: number, @Session() session: any) {
    if (session.userId != id) {
      throw new UnauthorizedException('you are not authorized');
    }
    return this.usersService.getUser(id);
  }

  @Put('/:id')
  @ApiOkResponse({ type: UserDto })
  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  async updateUsers(
    @Param('id') id: number,
    @Body() updateBody: CreateUserDto,
  ) {
    return this.usersService.updateUser(id, updateBody);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UserListDto })
  async deleteUser(@Param('id') id: number) {
    this.usersService.removeUser(id);
  }
}
