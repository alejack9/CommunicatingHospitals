import { Injectable } from '@nestjs/common';
// import { ConfigService } from '../../modules/config/config.service';

const fgcolors = [
  // '\x1b[31m',
  '\x1b[32m',
  '\x1b[33m',
  '\x1b[34m',
  '\x1b[35m',
];

// TODO Return e 'log' function instead of a class?
/**
 * @classdesc Logging and other tools
 */
@Injectable()
export class LoggerService {
  private readonly reset = '\x1b[0m';
  private readonly bg = '\x1b[40m';

  private currentColor = 0;

  private loggers: Map<string, string> = new Map();
  constructor() {
    this.loggers.set('LOGGERS-MANAGER', '\x1b[36m');
  }

  public log(namespace: string, message: string) {
    if (!this.loggers.has(namespace)) {
      this.print(
        'LOGGERS-MANAGER',
        'namespace does not exist, creating new logger...',
        true,
      );
      this.loggers.set(namespace, fgcolors[this.currentColor]);
      this.currentColor = (this.currentColor + 1) % fgcolors.length;
    }
    this.print(namespace, message);
  }

  private print(namespace: string, message: string, unique?: boolean) {
    if (!Boolean(process.env.DETAILS)) {
      return;
    }
    // tslint:disable-next-line: no-console
    console.log(
      // this.bg +
      // this.appColor +
      // '[App] - ' +
      // TODO We can use moment
      // BeautifyDate.beautify(Date.now()) +
      //   ' ' +
      this.loggers.get(namespace) +
        '[app:' +
        namespace +
        '] ' +
        (unique ? '' : this.reset) +
        message +
        this.reset,
    );
  }
}
