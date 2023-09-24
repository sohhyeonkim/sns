import {
  IDomainPrimitive,
  ValueObject,
} from '../../../../../libs/ddd/domain/base-classes/value-object.base';

export class NicknameVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }
  protected validate(props: IDomainPrimitive<string>): void {
    const regex =
      /^(?=.*[a-zA-Z가-힣0-9!@#$%^&*])[a-zA-Z가-힣0-9!@#$%^&*]{8,14}$/;

    if (props.value.length < 8 || props.value.length > 15) {
      throw new Error('nickname should be longer than 7, shorter than 15');
    }
    if (!regex.test(props.value)) {
      throw new Error(
        'nickname should be either korean, english, and special characters'
      );
    }
  }
}
