import { IBase, BaseType } from '@models/base';
// import { Audit, AuditType, IAudit } from '@models/audit';
import { Status, STATUS_MODES } from '@models/status.enum';
import { Category } from '@models/category.enum';
import { IUser } from './user';

export interface IEvent {
  id: string;
  active: boolean;
  name: string;
  image: string;
  images: string[];
  baseType: BaseType;
  status: Status;
  focused: boolean;
  categories?: Category[];
  description?: string;
  placeItems?: IBase[];
  entityItems?: IBase[];
  appointmentId?: string;
  auditItems?: IBase[];
  // createdBy?: string;
  // createdAt?: string;
  // updatedBy?: string;
  // updatedAt?: string;
  // updatedType?: AuditType;
}

export class Event implements IEvent, IBase { // IAudit

  public static IMAGE_DEFAULT = 'assets/images/events/default.png';
  public static PATH_URL = 'eventos';
  public static STATUS: Status[] = STATUS_MODES;

  constructor(
    public id: string,

    public active: boolean,
    public status: Status,
    public focused: boolean,

    public name: string,
    public image: string,
    public images: string[],
    public baseType: BaseType,

    public categories?: Category[],
    public description?: string,

    public placeItems?: IBase[],
    public entityItems?: IBase[],

    public appointmentId?: string,

    public auditItems?: IBase[],
    // public createdBy?: string,
    // public createdAt?: string,
    // public updatedBy?: string,
    // public updatedAt?: string,
    // public updatedType?: AuditType,
     ) {
  }

  static InitDefault(): Event {
    return new Event(
      '0',
      true, Status.Editing, true, // Status
      '', // Name
      Event.IMAGE_DEFAULT, [ Event.IMAGE_DEFAULT ], // Image
      BaseType.EVENT, // BaseType
      [], '', // Basics,
      [], // Place
      [], // Entity
      null, // Appointment
      [] // null, null, null, null, null // Audit
    );
  }
}
