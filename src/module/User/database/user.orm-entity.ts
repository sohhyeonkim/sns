import { Column, Entity } from 'typeorm';
import { TypeormEntityBase } from '../../../../libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Gender } from '../interface/gender';
import { Membership } from '../interface/membership';

@Entity({
  name: 'user',
  engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
})
export class UserOrmEntity extends TypeormEntityBase {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Column()
  birth: string;

  @Column()
  nickname: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'enum', enum: Membership, nullable: true })
  membership: Membership | null;
}
