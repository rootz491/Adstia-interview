import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './user/user.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
})
export class UserModule {}
