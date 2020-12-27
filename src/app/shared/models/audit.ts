import { IUser } from '@models/user';

export enum AuditType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED',
}

export interface IAudit {
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
  updatedType?: AuditType;
}

export class Audit implements IAudit {
  constructor(
    public createdBy?: string,
    public createdAt?: string,
    public updatedBy?: string,
    public updatedAt?: string,
    public updatedType?: AuditType,
     ) {
  }

  setCreationInfo(user: IUser): void {
    this.createdBy = user.uid;
    this.createdAt = new Date().toLocaleDateString();
    this.updatedBy = user.uid;
    this.updatedAt = new Date().toLocaleDateString();
    this.updatedType = AuditType.Created
  }

  setUpdateInfo(user: IUser): void {
    this.updatedBy = user.uid;
    this.updatedAt = new Date().toLocaleDateString();
    this.updatedType = AuditType.Updated
  }

  setDeleteInfo(user: IUser): void {
    this.updatedBy = user.uid;
    this.updatedAt = new Date().toLocaleDateString();
    this.updatedType = AuditType.Deleted
  }
}
