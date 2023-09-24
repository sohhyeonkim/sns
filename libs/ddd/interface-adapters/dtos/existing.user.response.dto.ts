import { Field, ObjectType } from '@nestjs/graphql';

import { IFindOneUser } from '../../../../infrastructure/database/crm.customer.repository';
import { TokenPayloadDto } from '../../../../modules/auth/dto/TokenPayloadDto';

@ObjectType() // <- only if you are using GraphQL
export class ExistingUserResponse {
  constructor(created: IFindOneUser, token: TokenPayloadDto) {
    this.created = created;
    this.token = token;
  }

  @Field() // <- only if you are using GraphQL
  readonly created: IFindOneUser;

  readonly token: TokenPayloadDto;
}
