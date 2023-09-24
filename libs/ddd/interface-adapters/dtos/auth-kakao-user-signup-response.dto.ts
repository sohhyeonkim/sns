import { ApiResponseProperty } from '@nestjs/swagger';

import { TokenPayloadDto } from '../../../../modules/auth/dto/TokenPayloadDto';
import { UserEntity } from '../../../../modules/user/domain/entities/user.entity';

export class AuthenticateKakaoUserSignupResponse {
  constructor(user: UserEntity, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }

  @ApiResponseProperty()
  readonly user: UserEntity;

  @ApiResponseProperty()
  readonly token: TokenPayloadDto;
}
