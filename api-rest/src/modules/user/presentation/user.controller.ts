// src/modules/public-form/presentation/public-form.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GetUserService } from '../application/use-cases/getUsers.service';
import type { CreateUserDto, UpdateUserDto, UserResponseDto } from '../application/dtos/user.dto';
import { CreateUserService } from '../application/use-cases/createUser.service';
import { UpdateUserService } from '../application/use-cases/updateUser.service';
import { DeleteUserService } from '../application/use-cases/deleteUser.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService) {}

  @Get('byTenant/:tenantId')
  async getUsersByTenant(
    @Param('tenantId') tenantId: string,
  ): Promise<UserResponseDto[]> {
    return this.getUserService.getUsersByTenant(tenantId);
  }

  @Get('')
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.getUserService.getAllUsers();
    return users;
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<UserResponseDto> {
    const user = await this.getUserService.getUserById(userId);
    return user;
  }

  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserService.execute(dto);
  }

  @Put(':userId')
  update(@Param('userId') userId: string, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
    return this.updateUserService.execute(userId, dto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string): Promise<void> {
    return this.deleteUserService.execute(userId);
  }
}
