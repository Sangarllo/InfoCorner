import { Role } from '@models/role.enum';

export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  password?: string;
  photoURL?: string;
  role?: Role;
}
