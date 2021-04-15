import { UserInfo, User } from './models/user';

export function convertUserToUserInfo(user: User | null): UserInfo | null {
  if (!user) {
    return null;
  }

  const { displayName, uid, photoURL } = user;

  return {
    displayName,
    uid,
    photoURL
  };

}
