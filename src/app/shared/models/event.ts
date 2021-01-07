import { IBase, BaseType } from '@models/base';
import { Status, STATUS_MODES } from '@models/status.enum';
import { Category } from '@models/category.enum';

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
  scheduleItems?: IBase[];
  placeItems?: IBase[];
  entityItems?: IBase[];
  appointmentId?: string;
  auditItems?: IBase[];
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

    public scheduleItems?: IBase[],
    public placeItems?: IBase[],
    public entityItems?: IBase[],

    public appointmentId?: string,

    public auditItems?: IBase[],
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
      [], // Event
      [], // Place
      [], // Entity
      null, // Appointment
      []  // Audit
    );
  }
}
