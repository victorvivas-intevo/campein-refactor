// src/modules/public-form/presentation/public-form.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GetUserService } from '../application/use-cases/getUsers.service';
import type {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../application/dtos/user.dto';
import { CreateUserService } from '../application/use-cases/createUser.service';
import { UpdateUserService } from '../application/use-cases/updateUser.service';
import { DeleteUserService } from '../application/use-cases/deleteUser.service';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Get('byTenant/:tenantId')
  async getUsersByTenant(
    @CurrentUser() currentUser: UserPayload,
    @Param('tenantId', new ParseUUIDPipe()) tenantId: string,
  ): Promise<UserResponseDto[]> {
    return this.getUserService.getUsersByTenant(currentUser, tenantId);
  }

  @Get('')
  async getAllUsers(
    @CurrentUser() currentUser: UserPayload,
  ): Promise<UserResponseDto[]> {
    const users = await this.getUserService.getAllUsers(currentUser);
    return users;
  }

  @Get(':userId')
  async getUserById(
    @CurrentUser() currentUser: UserPayload,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<UserResponseDto> {
    const user = await this.getUserService.getUserById(currentUser, userId);
    return user;
  }

  @Get('subordinates/:userId')
  async getUserSubordinates(
    @CurrentUser() currentUser: UserPayload,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<UserResponseDto[]> {
    const users = await this.getUserService.getUserSubordinates(
      currentUser,
      userId,
    );
    return users;
  }

  @Post()
  create(
    @CurrentUser() currentUser: UserPayload,
    @Body() dto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.createUserService.execute(currentUser, dto);
  }

  @Put(':userId')
  update(
    @CurrentUser() currentUser: UserPayload,
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateUserService.execute(currentUser, userId, dto);
  }

  @Delete(':userId')
  remove(
    @CurrentUser() currentUser: UserPayload,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<any> {
    return this.deleteUserService.execute(currentUser, userId);
  }
}
