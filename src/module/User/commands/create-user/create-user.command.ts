import {
  Command,
  CommandProps,
} from '../../../../../libs/ddd/domain/base-classes/command.base';
import { Gender } from '../../interface/gender';

export class CreateUserCommand extends Command {
  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
  }

  readonly email: string;

  readonly password: string;

  readonly birth: string;

  readonly nickname: string;

  readonly gender: Gender;
}
