import { decode } from 'jsonwebtoken';

interface User {
  username: string;
  name: string;
}

export const parseUserToken = (token?: string): User | null => {
  const decoded = decode(token || '');

  if (decoded && typeof decoded === 'object') {
    const { username } = decoded as User; // Type assertion
    if (username) {
      const name = username.split("@")[0];
      return { username, name }; // Return the user object
    }
  }

  return null; // Return null if token is invalid or user info is missing
};
