import { Field, ObjectType } from '@nestjs/graphql';

import type { IFindOneUser } from '../../../../infrastructure/database/crm.customer.repository';
import { TokenPayloadDto } from '../../../../modules/auth/dto/TokenPayloadDto';
import type { UserEntity } from '../../../../modules/user/domain/entities/user.entity';

@ObjectType() // <- only if you are using GraphQL
export class KakaoResponse {
  constructor(created: IFindOneUser | UserEntity, token: TokenPayloadDto) {
    this.created = created;
    this.token = token;
  }

  @Field() // <- only if you are using GraphQL
  readonly created: IFindOneUser | UserEntity;

  readonly token: TokenPayloadDto;
}
