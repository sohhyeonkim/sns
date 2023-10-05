import {
  Command,
  CommandProps,
} from '../../../../../libs/ddd/domain/base-classes/command.base';
import { LoginUserDto } from './dto/login-user.request.dto';

export class LoginUserCommand extends Command implements LoginUserDto {
  constructor(props: CommandProps<LoginUserCommand>) {
    super(props);
  }

  readonly email: string;

  readonly plainPassword: string;
}
