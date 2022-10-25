import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult, Repository } from 'typeorm';

import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { User } from './entities/user.entity';

import type {
  GotUserDto,
  CreateUserDto,
  UpdateUserDto,
  CreatedUserDto,
  UpdatedUserDto,
  GotUserDetailDto,
} from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(userInfo: CreateUserDto): Promise<CreatedUserDto> {
    const { email, phoneNumber } = userInfo;

    const user = await this.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });
    if (user) {
      throw new UserAlreadyException();
    }

    const createdUser = await this.userRepository.create(userInfo);

    await this.userRepository.save(createdUser);

    return createdUser.toResponse();
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  public async findOneByEmailOrPhoneNumber({
    email,
    phoneNumber,
  }: {
    email?: string;
    phoneNumber: string;
  }): Promise<User> {
    return this.userRepository.findOneBy([{ email }, { phoneNumber }]);
  }

  public async getAll(): Promise<GotUserDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  private async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { sessions: true },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async getById(id: string): Promise<GotUserDetailDto> {
    const user = await this.getUserById(id);

    return user.toResponse();
  }

  public async getByEmail(email: string): Promise<GotUserDto> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  public async updateById({
    id,
    updateInfo,
  }: {
    id: string;
    updateInfo: UpdateUserDto;
  }): Promise<UpdatedUserDto> {
    const { phoneNumber } = updateInfo;

    const user = await this.getUserById(id);

    if (phoneNumber && phoneNumber !== user?.phoneNumber) {
      const existedUser = await this.findOneByEmailOrPhoneNumber({
        phoneNumber,
      });

      if (existedUser) {
        throw new UserAlreadyException();
      }
    }

    const updatedUser = await this.userRepository.create({
      ...user,
      ...updateInfo,
    });

    await this.userRepository.save(updatedUser);

    return updatedUser.toResponse();
  }

  public async resetPassword({
    user,
    newPassword,
  }: {
    user: User;
    newPassword: string;
  }): Promise<void> {
    const updatedUser = await this.userRepository.create({
      ...user,
      password: newPassword,
    });

    await this.userRepository.save(updatedUser);

    return updatedUser.toResponse();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }
}
