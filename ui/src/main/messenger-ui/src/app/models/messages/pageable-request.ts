import {Message} from './message';

export abstract class PageableRequest extends Message {

  page: number;
  limit: number;
  sort: string;

}
