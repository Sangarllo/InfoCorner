import { Status, STATUS_MODES } from '@models/status.enum';
import { Category } from '@models/category.enum';
import { IPlace } from '@models/place';
import { IEntity } from '@models/entity';

export interface IEvent {
  id: string;
  active: boolean;
  name: string;
  image: string;
  status: Status;
  focused: boolean;
  categories?: Category[];
  description?: string;
  place?: IPlace;
  placeLocality?: string;
  placeDesc?: string;
  entity?: IEntity;
  entityRol?: string;
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
    public categories?: Category[],
    public description?: string,

    public place?: IPlace,
    public placeLocality?: string,
    public placeDesc?: string,

    public entity?: IEntity,
    public entityRol?: string,
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
      '',
      null, '', '', // Place
      null, '', // Entity
    );
  }
}
