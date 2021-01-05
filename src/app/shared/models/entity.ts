import { Category } from '@models/category.enum';
import { Place } from '@models/place';
import { EntityRole, ENTITY_ROLES } from '@models/entity-role.enum';
import { IBase, BaseType } from '@models/base';

export interface IEntity {
  id: string;
  active: boolean;
  name: string;
  image: string;
  baseType: BaseType;
  categories?: Category[];
  place?: Place;
  roleDefault?: EntityRole;
}

export class Entity implements IEntity, IBase {

  public static IMAGE_DEFAULT = 'assets/images/entities/default.png';
  public static NAME_DEFAULT = 'SIN ESPECIFICAR';
  public static PATH_URL = 'entidades';
  public static ROLES: EntityRole[] = ENTITY_ROLES;

  constructor(
    public id: string,
    public active: boolean,
    public name: string,
    public image: string,
    public baseType: BaseType,
    public categories?: Category[],
    public place?: Place,
    public roleDefault?: EntityRole,
     ) {
  }

  static InitDefault(): Entity {
    return new Entity(
      '0', true, Entity.NAME_DEFAULT, Entity.IMAGE_DEFAULT, BaseType.ENTITY, // Base
      [],
      null,
      null,
    );
  }
}
