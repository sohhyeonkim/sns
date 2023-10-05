import { AggregateRoot } from '../../../../libs/ddd/domain/base-classes/aggregate-root.base';
import { ID } from '../../../../libs/ddd/domain/value-objects/id.value-object';
import { UUID } from '../../../../libs/ddd/domain/value-objects/uuid.value-object';
import { Gender } from '../interface/gender';
import { Membership } from '../interface/membership';
import { BirthVO } from './value-object/birth.vo';
import { NicknameVO } from './value-object/nick-name.vo';
import { hashSync, compare } from 'bcrypt';

export interface CreateUserProps {
  email: string;
  plainPassword: string;
  birth: string;
  nickname: string;
  gender: Gender;
}

export interface UserProps {
  email: string;
  hashedPassword: string;
  birth: BirthVO;
  nickname: NicknameVO;
  gender: Gender;
  memebership: Membership | null;
}

export class UserEntity extends AggregateRoot<UserProps> {
  protected _id: ID;

  static create(create: CreateUserProps): UserEntity {
    const id = UUID.generate();

    const birth = new BirthVO(create.birth);
    const nickname = new NicknameVO(create.nickname);
    const props: UserProps = {
      email: create.gender,
      hashedPassword: this.createHash(create.plainPassword),
      birth,
      nickname,
      gender: create.gender,
      memebership: null,
    };
    const entity = new UserEntity({
      id,
      props,
    });

    return entity;
  }

  public validate(): void {
    throw new Error('validation failed');
  }

  private static createHash(plainPassword: string): string {
    return hashSync(plainPassword, 10);
  }

  validateHash(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.props.hashedPassword);
  }
}
