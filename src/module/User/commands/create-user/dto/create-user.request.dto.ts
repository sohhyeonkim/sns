import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserProps } from '../../../domain/user.entity';

import { Gender } from '../../../interface/gender';

export class CreateUserDto implements CreateUserProps {
  @ApiProperty({
    example: 'john@gmail.com',
  })
  @MaxLength(255)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  birth: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @ApiProperty({
    description: 'Manager login password',
  })
  @Length(8, 16, { message: '암호는 8~16자 길이어야 합니다.' })
  @IsString()
  readonly password: string;
}
