import { Status, STATUS_MODES } from '@models/status.enum';

export enum NoticeType {
  Otros = 'otro'
}

export interface INotice {
  id: string;
  active: boolean;
  name: string;
  image: string;
  type: string;
  status: Status;
  focused: boolean;
  text: string;
}

export class Notice implements INotice {

  public static IMAGE_DEFAULT = 'assets/images/notices/default.png';
  public static PATH_URL = 'avisos';
  public static STATUS: Status[] = STATUS_MODES;

  public static TYPE_DEFAULT = 'otros';
  public static TYPES: any[] = [
    {value: Notice.TYPE_DEFAULT, viewValue: 'Otros'}
  ];

  constructor(
    public id: string,
    public active: boolean,
    public name: string,
    public type: string,
    public image: string,
    public status: Status,
    public focused: boolean,
    public text: string,
     ) {
  }

  static InitDefault(): Notice {
    return new Notice(
      '0',
      true,
      '',
      Notice.TYPE_DEFAULT,
      Notice.IMAGE_DEFAULT,
      Status.Visible,
      true,
      ''
    );
  }
}
