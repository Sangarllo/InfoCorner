export interface IBase {
  id: string;
  name: string;
  image: string;
}

export class Base implements IBase {

  public static ID_DEFAULT = '0';
  public static NAME_DEFAULT = 'SIN ESPECIFICAR';
  // public static NAME_BLANK = '';
  public static IMAGE_DEFAULT = 'https://firebasestorage.googleapis.com/v0/b/memento-185617.appspot.com/o/no-image-default.png?alt=media';

  constructor(
    public id: string,
    public name: string,
    public image: string,
  ) { }


  static InitDefault(): Base {
    return new Base(
      Base.ID_DEFAULT,
      Base.NAME_DEFAULT,
      Base.IMAGE_DEFAULT,
    );
  }

  // Compara dos objetos en las listas mat-select
  public static compareSection(o1: IBase, o2: IBase): boolean {

    if ( !o1 || !o2 ) {
      return false;
    }

    if ( !(o1.name) || !(o2.name) ) {
      return o1.id === o2.id;
    }

    return o1.name === o2.name && o1.id === o2.id;
  }
}
