import { TokenPayloadDto } from '@modules/auth/dto/TokenPayloadDto';
import { UserGenders } from '@modules/user/domain/entities/user.types';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

import type { UserEntity } from '../../../domain/entities/user.entity';

class UserDto {
  constructor(user: UserEntity) {
    this.id = user.id.unpack();
    this.email = user.email;
    this.name = user.name;
    this.birth = user.birth;
    this.gender = user.gender;
    this.isPrevVtExists = user.isPrevVtExists;
    this.phone_number = user.phoneNumber;
  }

  @ApiResponseProperty()
  readonly id: string;

  @ApiResponseProperty()
  readonly email: string;

  @ApiResponseProperty()
  readonly name: string;

  @ApiResponseProperty()
  readonly gender: UserGenders;

  @ApiResponseProperty()
  readonly birth: string;

  @ApiResponseProperty()
  readonly isPrevVtExists: boolean;

  @ApiProperty({ type: 'string', nullable: true })
  readonly phone_number: string | null;
}

export class CreateUserResponseDto {
  constructor(user: UserEntity, token: TokenPayloadDto, isKakao: boolean) {
    this.user = new UserDto(user);
    this.token = token;
    this.isKakao = isKakao;
  }

  @ApiResponseProperty({ type: UserDto })
  readonly user: UserDto;

  @ApiResponseProperty({ type: TokenPayloadDto })
  readonly token: TokenPayloadDto;

  @ApiResponseProperty({ type: 'boolean' })
  readonly isKakao: boolean;
}
