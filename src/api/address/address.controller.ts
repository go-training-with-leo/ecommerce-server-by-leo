import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import type { User } from '@/api/user/entities/user.entity';

import {
  GotAddressDto,
  UpdateAddressDto,
  CreateAddressDto,
  UpdatedAddressDto,
  CreatedAddressDto,
  GotAddressDetailDto,
} from './dto';
import addressRoutes from './address.routes';
import { AddressService } from './address.service';

@InjectController({ name: addressRoutes.index })
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @InjectRoute(addressRoutes.create)
  public async create(
    @ReqUser() user: User,
    @Body() addressInfo: CreateAddressDto,
  ): Promise<CreatedAddressDto> {
    const createdAddress = await this.addressService.create(user, addressInfo);

    return createdAddress;
  }

  @InjectRoute(addressRoutes.getAll)
  public async getAll(@ReqUser() user: User): Promise<GotAddressDto[]> {
    const gotAddresses = await this.addressService.getAll(user);

    return gotAddresses;
  }

  @InjectRoute(addressRoutes.getById)
  public async getById(
    @ReqUser() user: User,
    @Param('id') id: string,
  ): Promise<GotAddressDetailDto> {
    const gotAddress = await this.addressService.getById({ user, id });

    return gotAddress;
  }

  @InjectRoute(addressRoutes.updateById)
  public async updateById(
    @ReqUser() user: User,
    @Param('id') id: string,
    @Body() updateInfo: UpdateAddressDto,
  ): Promise<UpdatedAddressDto> {
    const updatedAddress = await this.addressService.updateById({
      id,
      user,
      updateInfo,
    });

    return updatedAddress;
  }

  @InjectRoute(addressRoutes.deleteById)
  public async deleteById(
    @ReqUser() user: User,
    @Param('id') id: string,
  ): Promise<string> {
    await this.addressService.deleteById({ id, user });

    return id;
  }
}
