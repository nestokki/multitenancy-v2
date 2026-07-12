import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database/database.module';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository],
})
export class UserModule {}
