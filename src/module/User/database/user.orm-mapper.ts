import { UUID } from '../../../../libs/ddd/domain/value-objects/uuid.value-object';
import {
  IEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '../../../../libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { UserEntity, UserProps } from '../domain/user.entity';
import { BirthVO } from '../domain/value-object/birth.vo';
import { NicknameVO } from '../domain/value-object/nick-name.vo';
import type { UserOrmEntity } from './user.orm-entity';

export class UserOrmMapper extends OrmMapper<UserEntity, UserOrmEntity> {
  protected toOrmProps(entity: UserEntity): OrmEntityProps<UserOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<UserOrmEntity> = {
      email: props.email,
      hashedPassword: props.hashedPassword,
      nickname: props.nickname.unpack(),
      gender: props.gender,
      birth: props.birth.unpack(),
      membership: props.memebership,
    };

    return ormProps;
  }

  protected toDomainProps(ormEntity: UserOrmEntity): IEntityProps<UserProps> {
    const id = new UUID(ormEntity.id);
    const props: UserProps = {
      email: ormEntity.email,
      hashedPassword: ormEntity.hashedPassword,
      nickname: new NicknameVO(ormEntity.nickname),
      birth: new BirthVO(ormEntity.birth),
      gender: ormEntity.gender,
      memebership: ormEntity.membership,
    };

    return { id, props };
  }
}
