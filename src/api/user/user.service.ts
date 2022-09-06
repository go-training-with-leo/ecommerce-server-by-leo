import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  public async create(userInfo: CreateUserDto): Promise<User> {
    const { email, phoneNumber } = userInfo;

    const user = await this.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });
    if (user) {
      throw new UserAlreadyException();
    }

    const newUser = this.userRepository.create(userInfo);

    await this.userRepository.save(newUser);

    return newUser;
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  public async findOneByEmailOrPhoneNumber({
    email,
    phoneNumber,
  }: {
    email: string;
    phoneNumber: string;
  }): Promise<User> {
    return this.userRepository.findOneBy([{ email }, { phoneNumber }]);
  }
}
