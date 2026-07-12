import { Nullable } from 'src/common/type/native';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
@Unique('UQ_user_email', ['email'])
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'idx',
    type: 'int',
    unsigned: true,
    comment: '회원 PK',
  })
  idx: number;

  @Column('varchar', {
    name: 'name',
    comment: '이름',
  })
  name: string;

  @Column('varchar', {
    name: 'email',
    comment: '이메일',
  })
  email: string;

  @Column('varchar', {
    name: 'password_hash',
    comment: '비밀번호 해시',
  })
  passwordHash: string;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '전화번호',
  })
  phone: Nullable<string>;

  @Column('timestamp', {
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '수정 일자',
  })
  updatedAt: Date;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '생성 일자',
  })
  createdAt: Date;
}
