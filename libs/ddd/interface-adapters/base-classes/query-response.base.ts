export abstract class QueryResponseBase<ModelProps> {
  constructor(props: ModelProps) {
    Object.assign(this, props);
  }
}
