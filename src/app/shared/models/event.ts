import { Status, STATUS_MODES } from '@models/status.enum';

export enum EventType {
  Otros = 'otro'
}

export interface IEvent {
  id: string;
  active: boolean;
  name: string;
  image: string;
  type: string;
  status: Status;
  focused: boolean;
}

export class Event implements IEvent {

  public static IMAGE_DEFAULT = 'assets/images/events/default.png';
  public static PATH_URL = 'eventos';
  public static STATUS: Status[] = STATUS_MODES;

  public static TYPE_DEFAULT = 'otros';
  public static TYPES: any[] = [
    {value: 'deportivo', viewValue: 'Deportivo'},
    {value: 'cultural', viewValue: 'Cultural'},
    {value: Event.TYPE_DEFAULT, viewValue: 'Otros'}
  ];

  constructor(
    public id: string,
    public active: boolean,
    public name: string,
    public type: string,
    public image: string,
    public status: Status,
    public focused: boolean,
     ) {
  }

  static InitDefault(): Event {
    return new Event(
      '0',
      true,
      '',
      Event.TYPE_DEFAULT,
      Event.IMAGE_DEFAULT,
      Status.Visible,
      true,
    );
  }
}
