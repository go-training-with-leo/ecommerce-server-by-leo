import { Body, Param } from '@nestjs/common';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import userRoutes from './user.routes';
import { UserService } from './user.service';

import type { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

import type {
  GotUserDto,
  CreatedUserDto,
  UpdatedUserDto,
  GotUserDetailDto,
} from './dto';

@InjectController({ name: userRoutes.index })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @InjectRoute(userRoutes.create)
  public async create(
    @Body() userInfo: CreateUserDto,
  ): Promise<CreatedUserDto> {
    const createdUser = await this.userService.create(userInfo);

    return createdUser;
  }

  @InjectRoute(userRoutes.getAll)
  public async getAll(): Promise<GotUserDto[]> {
    const gotUsers = await this.userService.getAll();

    return gotUsers;
  }

  @InjectRoute(userRoutes.getMe)
  public async getMe(@ReqUser() user: User): Promise<GotUserDetailDto> {
    const gotUser = await this.userService.getById(user?.id);

    return gotUser;
  }

  @InjectRoute(userRoutes.updateMe)
  public async updateMe(
    @ReqUser() user: User,
    @Body() updateInfo: UpdateUserDto,
  ): Promise<UpdatedUserDto> {
    const updatedUser = await this.userService.updateById({
      updateInfo,
      id: user?.id,
    });

    return updatedUser;
  }

  @InjectRoute(userRoutes.getById)
  public async getById(@Param('id') uid: string): Promise<GotUserDetailDto> {
    const gotUser = await this.userService.getById(uid);

    return gotUser;
  }

  @InjectRoute(userRoutes.updateById)
  public async updateById(
    @Param('id') uid: string,
    @Body() updateInfo: UpdateUserDto,
  ): Promise<UpdatedUserDto> {
    const updatedUser = await this.userService.updateById({
      id: uid,
      updateInfo,
    });

    return updatedUser;
  }

  @InjectRoute(userRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.userService.deleteById(id);

    return id;
  }
}
