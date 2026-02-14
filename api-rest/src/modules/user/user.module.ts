import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './presentation/user.controller';
import {
  USER_QUERY_REPOSITORY,
  USER_COMMAND_REPOSITORY,
} from './application/tokens';
import { GetUserService } from './application/use-cases/getUsers.service';
import { CreateUserService } from './application/use-cases/createUser.service';
import { UpdateUserService } from './application/use-cases/updateUser.service';
import { DeleteUserService } from './application/use-cases/deleteUser.service';
import { ChangeUserStatusService } from './application/use-cases/changeUser.service';

@Module({
  controllers: [UserController],
  providers: [
    GetUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    ChangeUserStatusService,
    UserRepository,
    { provide: USER_QUERY_REPOSITORY, useExisting: UserRepository },
    { provide: USER_COMMAND_REPOSITORY, useExisting: UserRepository },
  ],
  exports: [
    ChangeUserStatusService,
    GetUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UsersModule {}
