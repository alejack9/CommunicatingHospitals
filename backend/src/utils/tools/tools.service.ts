import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '..', 'run.env') });
import * as debug from 'debug';

@Injectable()
export class ToolsService {
  private logger = debug('app:loggerMaker');
  private loggers: Map<string, debug.IDebugger> = new Map();

  get path() {
    return path;
  }
  public getLogger(namespace: string): debug.IDebugger {
    if (this.loggers.has(namespace)) {
      return this.loggers.get(namespace);
    }

    this.logger(`${namespace} does not exist, creating new logger...`);
    const toInsert = debug(namespace);
    this.loggers.set(namespace, toInsert);
    return toInsert;
  }
}
