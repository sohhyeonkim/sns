import { AggregateRoot } from '../../../../libs/ddd/domain/base-classes/aggregate-root.base';
import { ID } from '../../../../libs/ddd/domain/value-objects/id.value-object';
import { UUID } from '../../../../libs/ddd/domain/value-objects/uuid.value-object';
import { Gender } from '../interface/gender';
import { Membership } from '../interface/membership';
import { BirthVO } from './value-object/birth.vo';
import { NicknameVO } from './value-object/nick-name.vo';

export interface CreateUserProps {
  email: string;
  password: string;
  birth: string;
  nickname: string;
  gender: Gender;
}

export interface UserProps {
  email: string;
  password: string;
  birth: BirthVO;
  nickname: NicknameVO;
  gender: Gender;
  memebership: Membership | null;
}

export class UserEntity extends AggregateRoot<UserProps> {
  protected _id: ID;

  static create(create: CreateUserProps): UserEntity {
    const id = UUID.generate();
    /* Setting a default role since we are not accepting it during creation. */

    const birth = new BirthVO(create.birth);
    const nickname = new NicknameVO(create.nickname);
    const props: UserProps = {
      email: create.gender,
      password: create.password,
      birth,
      nickname,
      gender: create.gender,
      memebership: null,
    };
    const profile = new UserEntity({
      id,
      props,
    });
    /* adding "UserCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action */

    return profile;
  }

  public validate(): void {
    throw new Error('validation failed');
  }
}
