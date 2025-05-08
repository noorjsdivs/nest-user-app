import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './app.service';
import { User } from 'type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // get all users
  @Get('all')
  getAllUsers(): User[] | undefined {
    return this.userService.getAllUsers();
  }

  // get user by id
  @Get(':id')
  getUserByID(@Param('id') id: string): User | undefined | { message: string } {
    const userID = +id;
    return this.userService.getUserByID(userID);
  }

  // create a user
  @Post('create')
  createUser(@Body() user: Partial<User>): User | { message: string } {
    const userData = user;
    if (
      !userData.name ||
      !userData.email ||
      !userData.phone ||
      !userData.imageUrl
    ) {
      return { message: 'Name, email, phone, and imageUrl are required' };
    }
    return this.userService.createUser(userData);
  }

  // update a user
  @Put('update/:id')
  updateUser(
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ): User | undefined | { message: string } {
    return this.userService.updateUser(+id, user);
  }

  // delete a user
  @Delete('delete/:id')
  deleteUserByID(
    @Param('id') id: string,
  ): User[] | undefined | { message: string } {
    return this.userService.deleteUserByID(+id);
  }
}
