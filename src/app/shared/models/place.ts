import { PlaceType } from '@models/place-type.enum';
export interface IPlace {
  id: string;
  active: boolean;
  name: string;
  image: string;
  type?: PlaceType[];
  locality?: string;
}

export class Place implements IPlace {

  public static IMAGE_DEFAULT = 'assets/images/places/default.png';
  public static LOCALITY_DEFAULT = 'Rincón de Soto';
  public static PATH_URL = 'lugares';

  constructor(
    public id: string,
    public active: boolean,
    public name: string,
    public image: string,
    public type?: PlaceType[],
    public locality?: string,
     ) {
  }

  static InitDefault(): Place {
    return new Place(
      '0',
      true,
      '',
      Place.IMAGE_DEFAULT,
      [ PlaceType.Other ],
      Place.LOCALITY_DEFAULT
    );
  }
}
