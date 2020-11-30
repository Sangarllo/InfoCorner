import { IUser } from '@models/user';

export class RoleValidator {
  isSuscriptor(user: IUser): boolean {
    return user.role === 'SUSCRIPTOR';
  }

  isEditor(user: IUser): boolean {
    return user.role === 'EDITOR';
  }

  isAdmin(user: IUser): boolean {
    return user.role === 'ADMIN';
  }
}
