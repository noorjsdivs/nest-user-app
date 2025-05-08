import { users } from 'src/data';

export const getCurrentUser = (userID: number) => {
  const currentUser = users.find((user) => user.id === userID);
  return currentUser;
};
