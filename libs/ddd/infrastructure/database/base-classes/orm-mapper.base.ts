import type {
  Entity as ChildEntity,
  ICreateEntityProps,
} from '@libs/ddd/domain/base-classes/entity.base';

/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import type { AggregateRoot } from '../../../domain/base-classes/aggregate-root.base';
import { DateVO } from '../../../domain/value-objects/date.value-object';
import type { ID } from '../../../domain/value-objects/id.value-object';
import type { TypeormEntityBase } from './typeorm.entity.base';

export type OrmEntityProps<OrmEntity> = Omit<
  OrmEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface IEntityProps<EntityProps> {
  id: ID;
  props: EntityProps;
}

export abstract class OrmMapper<
  Entity extends ChildEntity<unknown>,
  OrmEntity,
> {
  constructor(
    private entityConstructor: new (props: ICreateEntityProps<any>) => Entity,
    private ormEntityConstructor: new (props: any) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): IEntityProps<unknown>;

  protected abstract toOrmProps(entity: Entity): OrmEntityProps<OrmEntity>;

  toDomainEntity(ormEntity: OrmEntity): Entity {
    const { id, props } = this.toDomainProps(ormEntity);
    const ormEntityBase: TypeormEntityBase =
      ormEntity as unknown as TypeormEntityBase;

    return new this.entityConstructor({
      id,
      props,
      createdAt: new DateVO(ormEntityBase.createdAt),
      updatedAt: new DateVO(ormEntityBase.updatedAt),
    });
  }

  toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);

    return new this.ormEntityConstructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt.value,
    });
  }
}
