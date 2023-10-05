import {
  Command,
  CommandProps,
} from '../../../../../libs/ddd/domain/base-classes/command.base';
import { BirthVO } from '../../../User/domain/value-object/birth.vo';
import { NicknameVO } from '../../../User/domain/value-object/nick-name.vo';
import { Gender } from '../../interface/gender';

export class CreateTokenCommand extends Command {
  constructor(props: CommandProps<CreateTokenCommand>) {
    super(props);
  }

  readonly email: string;

  readonly birth: BirthVO;

  readonly nickname: NicknameVO;

  readonly gender: Gender;
}
