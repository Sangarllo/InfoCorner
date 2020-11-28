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
