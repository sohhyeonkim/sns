import {
  IDomainPrimitive,
  ValueObject,
} from '../../../../../libs/ddd/domain/base-classes/value-object.base';

export class BirthVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }
  protected validate({ value }: IDomainPrimitive<string>): void {
    if (!/^(19\d\d|20\d{2})(0\d|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(value)) {
      throw new Error('birthYear should have in form of 19991010');
    }
  }

  static caculateInternationAge(birth: string): number {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Months are zero-based
    const currentDay = today.getDate();

    const birthYear = Number(birth.slice(0, 4));
    const birthMonth = Number(birth.slice(4, 6));
    const birthDay = Number(birth.slice(-2));

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      // The birthday hasn't passed yet this year
      return currentYear - birthYear - 1;
    } else {
      // The birthday has already passed this year
      return currentYear - birthYear;
    }
  }
}
