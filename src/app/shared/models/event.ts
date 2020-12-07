import { Status, STATUS_MODES } from '@models/status.enum';
import { Category } from '@models/category.enum';

export interface IEvent {
  id: string;
  active: boolean;
  name: string;
  image: string;
  status: Status;
  focused: boolean;
  categories?: Category[];
  description?: string;
}

export class Event implements IEvent {

  public static IMAGE_DEFAULT = 'assets/images/events/default.png';
  public static PATH_URL = 'eventos';
  public static STATUS: Status[] = STATUS_MODES;

  constructor(
    public id: string,
    public active: boolean,
    public name: string,
    public image: string,
    public status: Status,
    public focused: boolean,
    public categories: Category[],
    public description: string,
     ) {
  }

  static InitDefault(): Event {
    return new Event(
      '0',
      true,
      '',
      Event.IMAGE_DEFAULT,
      Status.Visible,
      true,
      [],
      ''
    );
  }
}
