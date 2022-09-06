import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Token } from './token.entity';
import { TokenRepository } from './token.repository';

import type { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: TokenRepository,
  ) {}

  public async create(tokenInfo: CreateTokenDto): Promise<Token> {
    const newToken = this.tokenRepository.create(tokenInfo);

    await this.tokenRepository.save(newToken);

    return newToken;
  }
}
