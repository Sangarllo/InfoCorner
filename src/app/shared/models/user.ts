import { UserRole } from '@app/shared/models/user-role.enum';

export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  password?: string;
  photoURL?: string;
  role?: UserRole;
}
