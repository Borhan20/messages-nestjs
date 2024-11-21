import { Test } from "@nestjs/testing";
import { AuthServiceImpl } from "./impl/auth.service.impl";
import { UsersServiceImpl } from "./impl/user.service.impl";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { randomBytes } from "crypto";
import { UserRepository } from "../repository/user.repository";



jest.mock('crypto', () => ({
    ...jest.requireActual('crypto'),
    scrypt: jest.fn((password, salt, keylen, callback) => {
      const hash = Buffer.from('hashedpassword'); // Match the stored hash in the mock user
      callback(null, hash);
    }),
  }));

describe('AuthServiceImpl', () => {
  let authService: AuthServiceImpl;
  let fakeUsersService: Partial<UsersServiceImpl>;
  let fakeUserRepository: Partial<UserRepository>;

  beforeEach(async () => {
   
    fakeUserRepository = {
        findOne:jest.fn(),
        create:jest.fn(),
        save:jest.fn()
    };
    // Mock UsersServiceImpl
    fakeUsersService = {
      find: jest.fn(),
      create: jest.fn(),
    };

    // Create a testing module
    const module = await Test.createTestingModule({
      providers: [
        AuthServiceImpl,
        {
          provide: UsersServiceImpl,
          useValue: fakeUsersService,
        },
        {
            provide: UserRepository,
            useValue: fakeUserRepository
        }
      ],
    }).compile();

    authService = module.get<AuthServiceImpl>(AuthServiceImpl);
  });

  it('can create an instance of auth service', () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('throws a BadRequestException if the email is already in use', async () => {
      (fakeUsersService.find as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

      await expect(authService.signup('test@example.com', 'password'))
        .rejects
        .toThrow(BadRequestException);
    });

    it('creates a new user if the email is not in use', async () => {
      (fakeUsersService.find as jest.Mock).mockResolvedValue(null);
      (fakeUsersService.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashed.password',
      });

      const user = await authService.signup('test@example.com', 'password');
      expect(user).toEqual({
        id: 1,
        email: 'test@example.com',
        password: 'hashed.password',
      });
    });
  });

  describe('signin', () => {
    it('throws a NotFoundException if the user is not found', async () => {
      (fakeUsersService.find as jest.Mock).mockResolvedValue(null);

      await expect(authService.signin('test@example.com', 'password'))
        .rejects
        .toThrow(NotFoundException);
    });

    it('throws an UnauthorizedException if the password is incorrect', async () => {
      (fakeUsersService.find as jest.Mock).mockResolvedValue({
        email: 'test@example.com',
        password: 'salt.hashedpassword',
      });

      await expect(authService.signin('test@example.com', 'wrongpassword'))
        .rejects
        .toThrow(UnauthorizedException);
    });

    // it('returns the user if the credentials are valid', async () => {
    //     const mockPassword = 'salt.hashedpassword';
    //     (fakeUsersService.find as jest.Mock).mockResolvedValue({
    //       email: 'test@example.com',
    //       password: mockPassword,
    //     });
    
    //     const user = await authService.signin('test@example.com', 'password');
    //     console.log(user)
    //     expect(user).toEqual({
    //       email: 'test@example.com',
    //       password: 'salt.hashedpassword',
    //     });
    //   });
  });
});
