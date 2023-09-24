import type { DeepPartial } from '../../../types';
import type { IBaseEntityProps } from '../base-classes/entity.base';
import type { ID } from '../value-objects/id.value-object';

/*  Most of repositories will probably need generic
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific interfaces should be defined
    in a respective module/use case.
*/

export type QueryParams<EntityProps> = DeepPartial<
  IBaseEntityProps & EntityProps
>;

export interface ISave<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface ISaveMultiple<Entity> {
  saveMultiple(entities: Entity[]): Promise<Entity[]>;
}

export interface IFindOne<Entity, EntityProps> {
  findOneOrThrow(params: QueryParams<EntityProps>): Promise<Entity>;
}

export interface IFindOneById<Entity> {
  findOneByIdOrThrow(id: ID | string): Promise<Entity>;
}

export interface IFindMany<Entity, EntityProps> {
  findMany(params: QueryParams<EntityProps>): Promise<Entity[]>;
}

export class Paginated<T> {
  readonly itemCount: number;

  readonly take: number;

  readonly page: number;

  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.itemCount = props.itemCount;
    this.take = props.take;
    this.page = props.page;
    this.data = props.data;
  }
}

export interface OrderBy {
  field: string /*| true*/;
  param: 'ASC' | 'DESC';
}

export interface PaginatedQueryParams {
  take: number;
  page: number;
  skip: number;
  orderBy?: OrderBy;
}

export interface FindAllPaginated<Entity> {
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>;
}

export interface IDeleteOne<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

export interface RepositoryPort<Entity, EntityProps>
  extends ISave<Entity>,
    IFindOne<Entity, EntityProps>,
    IFindOneById<Entity>,
    IFindMany<Entity, EntityProps>,
    // FindAllPaginated<Entity>,
    IDeleteOne<Entity>,
    ISaveMultiple<Entity> {
  setCorrelationId(correlationId: string): this;
}
