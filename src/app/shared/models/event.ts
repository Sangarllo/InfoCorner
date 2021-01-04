import { IBase } from '@models/base';
import { Audit, AuditType, IAudit } from '@models/audit';
import { Status, STATUS_MODES } from '@models/status.enum';
import { Category } from '@models/category.enum';
import { IPlace } from '@models/place';
import { IEntity } from '@models/entity';
import { IUser } from './user';

export interface IEvent {
  id: string;
  active: boolean;
  name: string;
  image: string;
  images: string[];
  status: Status;
  focused: boolean;
  categories?: Category[];
  description?: string;
  baseInfo?: IBase;
  // place?: IPlace;
  // placeLocality?: string;
  // placeDesc?: string;
  placeItems?: IBase[];
  entityBase?: IBase;
  entityItems?: IBase[];
  appointmentId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
  updatedType?: AuditType;
}

export class Event implements IEvent, IBase, IAudit {

  public static IMAGE_DEFAULT = 'assets/images/events/default.png';
  public static PATH_URL = 'eventos';
  public static STATUS: Status[] = STATUS_MODES;

  constructor(
    public id: string,

    public active: boolean,
    public status: Status,
    public focused: boolean,

    public image: string,
    public images: string[],

    public name: string,
    public categories?: Category[],
    public description?: string,

    public baseInfo?: IBase,

    // public place?: IPlace,
    // public placeLocality?: string,
    // public placeDesc?: string,
    public placeItems?: IBase[],

    public entityBase?: IBase,
    public entityItems?: IBase[],

    public appointmentId?: string,

    public createdBy?: string,
    public createdAt?: string,
    public updatedBy?: string,
    public updatedAt?: string,
    public updatedType?: AuditType,
     ) {
  }

  static InitDefault(): Event {
    return new Event(
      '0',
      true, Status.Editing, true, // Status
      Event.IMAGE_DEFAULT, [ Event.IMAGE_DEFAULT ], // Image
      '', [], '', // Basics,
      null,
      [], // Place
      null, [], // Entity
      null, // Appointment
      null, null, null, null, null // Audit
    );
  }
}
