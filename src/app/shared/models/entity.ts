export enum EntityType {
  Otros = 'otro'
}

export interface IEntity {
  id: string;
  active: boolean;
  name: string;
  image: string;
  type: string;
}

export class Entity implements IEntity {

  public static IMAGE_DEFAULT = 'assets/images/entities/default.png';
  public static PATH_URL = 'entidades';

  public static TYPE_DEFAULT = 'otras';
  public static TYPES: any[] = [
    {value: 'cultural', viewValue: 'Cultural'},
    {value: 'deportiva', viewValue: 'Deportiva'},
    {value: Entity.TYPE_DEFAULT, viewValue: 'Otras'}
  ];

  id: string;
  active: boolean;
  name: string;
  image: string;
  type: string;
}
