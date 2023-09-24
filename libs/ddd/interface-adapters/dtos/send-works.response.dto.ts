import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType() // <- only if you are using GraphQL
export class SendWorksResponse {
  constructor(isSent: boolean) {
    this.isSent = isSent;
  }

  @Field() // <- only if you are using GraphQL
  readonly isSent: boolean;
}
