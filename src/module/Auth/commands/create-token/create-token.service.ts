import { CommandHandler } from '@nestjs/cqrs';
import { CreateTokenCommand } from './create-token.command';
import type { Result } from 'oxide.ts/dist';
import { Err, Ok } from 'oxide.ts/dist';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../User/domain/user.entity';
import { userInfo } from 'os';

@CommandHandler(CreateTokenCommand)
export class CreateTokenService {
  constructor(private jwtService: JwtService) {}

  async handle(command: CreateTokenCommand): Promise<
    Result<
      {
        accessToken: string;
      },
      Error
    >
  > {
    const { email, birth, nickname, gender } = command;
    const payload = {
      sub: email,
      nickname: nickname.unpack(),
      gender,
      birth: birth.unpack(),
    };

    return Ok({
      accessToken: await this.jwtService.signAsync(payload),
    });
  }
}
