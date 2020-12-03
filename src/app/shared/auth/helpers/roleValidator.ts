import { IUser } from '@models/user';
import { Role } from '@models/role.enum';

export class RoleValidator {
  isSuper(user: IUser): boolean {
    return user.role === Role.Super;
  }

  isAdmin(user: IUser): boolean {
    return user.role === Role.Admin;
  }

  isCensor(user: IUser): boolean {
    return user.role === Role.Censor;
  }

  isAutor(user: IUser): boolean {
    return user.role === Role.Autor;
  }

  isLector(user: IUser): boolean {
    return user.role === Role.Lector;
  }
}
