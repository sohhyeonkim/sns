import type { Order } from '@constants/order';
import type {
  OrderBy,
  PaginatedQueryParams,
} from '@libs/ddd/domain/ports/repository.ports';

export abstract class QueryBase {}

export abstract class PaginatedQueryBase extends QueryBase {
  take: number;

  offset: number;

  order: Order;

  orderBy: OrderBy;

  page: number;

  constructor(props: PaginatedParams<PaginatedQueryBase>) {
    super();
    this.take = props.take || 15;
    this.offset =
      props.page && props.page > 0 ? (props.page - 1) * this.take : 0;
    this.page = props.page || 1;
    this.orderBy = { field: 'createdAt', param: props.order || 'DESC' };
  }
}

// Paginated query parameters
export type PaginatedParams<T> = Omit<
  T,
  'limit' | 'offset' | 'orderBy' | 'page'
> &
  Partial<Omit<PaginatedQueryParams, 'offset'>>;
