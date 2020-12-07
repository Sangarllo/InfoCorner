import { Status, STATUS_MODES } from '@models/status.enum';
import { Category } from '@models/category.enum';

export interface INotice {
  id: string;
  active: boolean;
  name: string;
  image: string;
  status: Status;
  focused: boolean;
  categories?: Category[];
  description?: string;
}

export class Notice implements INotice {

  public static IMAGE_DEFAULT = 'assets/images/notices/default.png';
  public static PATH_URL = 'avisos';
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

  static InitDefault(): Notice {
    return new Notice(
      '0',
      true,
      '',
      Notice.IMAGE_DEFAULT,
      Status.Visible,
      true,
      [],
      ''
    );
  }
}
