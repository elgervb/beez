import { Injectable } from '@nestjs/common';
import { description, name, keywords, version } from '../package.json';

export interface AppDetails {
  version: string;
  description: string;
  name: string;
  keywords: string[]
}
@Injectable()
export class AppService {

  getDetails(): AppDetails {
    return {
      version,
      description,
      name,
      keywords
    };
  }


}
