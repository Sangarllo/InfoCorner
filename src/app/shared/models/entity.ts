import { Category } from '@models/category.enum';

export interface IEntity {
  id: string;
  active: boolean;
  name: string;
  image: string;
  categories?: Category[];
}

export class Entity implements IEntity {

  public static IMAGE_DEFAULT = 'assets/images/entities/default.png';
  public static PATH_URL = 'entidades';

  constructor(
    public id: string,
    public active: boolean,
    public name: string,
    public image: string,
    public categories: Category[],
     ) {
  }

  static InitDefault(): Entity {
    return new Entity(
      '0',
      true,
      '',
      Entity.IMAGE_DEFAULT,
      [],
    );
  }
}
