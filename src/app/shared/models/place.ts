export enum PlaceType {
  Otros = 'otro'
}

export interface IPlace {
  id: string;
  active: boolean;
  name: string;
  image: string;
  categories?: Category[];
  locality?: string;
}

export class Place implements IPlace {

  public static IMAGE_DEFAULT = 'assets/images/places/default.png';
  public static LOCALITY_DEFAULT = 'Rincón de Soto';
  public static PATH_URL = 'lugares';

  public static TYPE_DEFAULT = 'otras';
  public static TYPES: any[] = [
    {value: 'bar', viewValue: 'Bar'},
    {value: 'naturaleza', viewValue: 'Naturaleza'},
    {value: Place.TYPE_DEFAULT, viewValue: 'Otros'}
  ];

  constructor(
    public id: string,
    public active: boolean,
    public name: string,
    public type: string,
    public image: string,
    public locality?: string,
     ) {
  }

  static InitDefault(): Place {
    return new Place(
      '0',
      true,
      '',
      Place.TYPE_DEFAULT,
      Place.IMAGE_DEFAULT,
      Place.LOCALITY_DEFAULT
    );
  }
}
