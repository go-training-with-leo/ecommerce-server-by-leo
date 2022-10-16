import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import type { User } from '@/api/user/entities';

import { Address } from './entities';

import type {
  GotAddressDto,
  CreateAddressDto,
  UpdateAddressDto,
  CreatedAddressDto,
  UpdatedAddressDto,
  GotAddressDetailDto,
} from './dto';
import { isAdmin } from '@/utils/helpers';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  public async create(
    user: User,
    addressInfo: CreateAddressDto,
  ): Promise<CreatedAddressDto> {
    const createdAddress = this.addressRepository.create({
      ...addressInfo,
      createdBy: user,
    });

    await this.addressRepository.save(createdAddress);

    return createdAddress;
  }

  public async getAll(user: User): Promise<GotAddressDto[]> {
    let condition = {};

    if (!isAdmin(user)) {
      condition = { createdBy: { id: user?.id } };
    }

    const addresses = await this.addressRepository.find({
      where: condition,
    });

    return addresses;
  }

  public async getById({
    id,
    user,
  }: {
    id: string;
    user: User;
  }): Promise<GotAddressDetailDto> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: { createdBy: true },
    });

    if (!address) {
      throw new NotFoundException();
    }

    if (address?.createdBy?.id !== user?.id && !isAdmin(user)) {
      throw new ForbiddenException();
    }

    return address;
  }

  public async updateById({
    id,
    user,
    updateInfo,
  }: {
    id: string;
    user: User;
    updateInfo: UpdateAddressDto;
  }): Promise<UpdatedAddressDto> {
    const address = await this.getById({ user, id });

    const updatedAddress = await this.addressRepository.create({
      ...address,
      ...updateInfo,
    });

    await this.addressRepository.save(updatedAddress);

    return updatedAddress;
  }

  public async deleteById(user: User, id: string): Promise<DeleteResult> {
    await this.getById({ user, id });

    return this.addressRepository.delete({ id });
  }
}
