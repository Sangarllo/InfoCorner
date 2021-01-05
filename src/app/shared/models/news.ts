import { IBase, BaseType } from '@models/base';
import { Status, STATUS_MODES } from '@models/status.enum';
import { Category } from '@models/category.enum';

export interface INewsItem {
  id: string;
  active: boolean;
  name: string;
  image: string;
  baseType: BaseType;
  status: Status;
  focused: boolean;
  categories?: Category[];
  description?: string;
  timestamp?: string;
  timestampDate?: Date;
  timestampDist?: string;
  sourceName?: string;
  sourceUrl?: string;
}

export class NewsItem implements INewsItem, IBase {

  public static IMAGE_DEFAULT = 'assets/images/news/default.png';
  public static PATH_URL = 'noticias';
  public static STATUS: Status[] = STATUS_MODES;

  constructor(
    public id: string,
    public active: boolean,
    public name: string,
    public image: string,
    public baseType: BaseType,
    public status: Status,
    public focused: boolean,
    public categories?: Category[],
    public description?: string,
    public timestamp?: string,
    public timestampDate?: Date,
    public timestampDist?: string,
    public sourceName?: string,
    public sourceUrl?: string,
     ) {
  }

  static InitDefault(): NewsItem {
    return new NewsItem(
      '0', true, '', NewsItem.IMAGE_DEFAULT, BaseType.NEWS_ITEM, // Base
      Status.Visible,
      true,
      [],
      '',
      null, null, null, // Timestamp
      null, null, // Source
    );
  }
}
