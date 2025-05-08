import { Injectable } from '@nestjs/common';
import { User } from 'type';
import { users } from './data';
import { getCurrentUser } from './helpers';

@Injectable()
export class UserService {
  // get all users
  getAllUsers(): User[] {
    return users;
  }

  // get user by id
  getUserByID(userID: number): User | undefined | { message: string } {
    const user = users.find((user) => user.id === userID);
    return user ? user : { message: `User not available with id ${userID}` };
  }

  // create new user
  createUser(user: Partial<User>): User {
    const newID = users[users.length - 1].id + 1;
    const newUser: User = {
      id: newID,
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      imageUrl: user.imageUrl ?? '',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  }

  // update a user
  updateUser(
    userID: number,
    updatedUserFields: Partial<User>,
  ): User | undefined | { message: string } {
    // Check if the request body is empty
    if (Object.keys(updatedUserFields).length === 0) {
      return { message: 'Please provide fields to update' };
    }

    const currentUser = getCurrentUser(userID);

    if (!currentUser) {
      return { message: `User not available with id ${userID}` };
    }

    const updatedUser = {
      id: userID,
      name: updatedUserFields.name ?? currentUser.name ?? '',
      email: updatedUserFields.email ?? currentUser.email ?? '',
      phone: updatedUserFields.phone ?? currentUser.phone ?? '',
      imageUrl: updatedUserFields.imageUrl ?? currentUser.imageUrl ?? '',
      createdAt: currentUser.createdAt ?? '',
      updatedAt: new Date().toISOString(),
    };
    users[userID - 1] = updatedUser;
    return updatedUser;
  }

  // delete a user
  deleteUserByID(userID: number): User[] | undefined | { message: string } {
    const currentUser = getCurrentUser(userID);
    if (!currentUser) {
      return { message: `User not available with id ${userID}` };
    }
    const newUsers = users.filter((user) => user.id !== userID);
    return newUsers;
  }
}
