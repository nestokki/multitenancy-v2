import { Column, Entity, Generated, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('platform')
@Unique('UQ_platform_platform_id', ['platformId'])
export class PlatformEntity {
  @PrimaryGeneratedColumn({
    name: 'idx',
    type: 'int',
    unsigned: true,
    comment: '플랫폼 PK',
  })
  idx: number;

  @Column('uuid', {
    name: 'platform_id',
    comment: '플랫폼 ID',
  })
  @Generated('uuid')
  platformId: string;

  @Column('varchar', {
    name: 'name',
    comment: '플랫폼 이름',
  })
  name: string;

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
