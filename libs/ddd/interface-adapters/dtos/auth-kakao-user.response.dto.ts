import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

import { TokenPayloadDto } from '../../../../modules/auth/dto/TokenPayloadDto';
import { UserEntity } from '../../../../modules/user/domain/entities/user.entity';
import { TermAgreementDto } from '../../../../modules/user/dtos/user-term-agreement.dto';

export class AuthenticateKakaoUserResponse {
  constructor(
    user: UserEntity,
    token: TokenPayloadDto,
    isVtSubmitted: boolean,
    canSubmitTeaTime: boolean,
    teaTimeSchedule: string | null,
    termAgreement: TermAgreementDto[],
  ) {
    this.user = user;
    this.token = token;
    this.isVtSubmitted = isVtSubmitted;
    this.canSubmitTeaTime = canSubmitTeaTime;
    this.teaTimeSchedule = teaTimeSchedule;
    this.termAgreement = termAgreement;
  }

  @ApiResponseProperty()
  readonly user: UserEntity;

  @ApiResponseProperty()
  readonly token: TokenPayloadDto;

  @ApiResponseProperty()
  readonly isVtSubmitted: boolean;

  @ApiResponseProperty()
  readonly canSubmitTeaTime: boolean;

  @ApiProperty({ type: 'string', nullable: true })
  readonly teaTimeSchedule: string | null;

  @ApiResponseProperty({ type: [TermAgreementDto] })
  readonly termAgreement: TermAgreementDto[];
}
