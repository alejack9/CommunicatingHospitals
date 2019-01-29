import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({
  path: path.join(
    __dirname,
    "..",
    "..",
    "config",
    "environments",
    "process.env"
  )
});
import * as config from "config";
import * as debug from "debug";

export default class Tools {
  static get Instance() {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new Tools();
    }
    return this.instance;
  }

  get config() {
    return config;
  }

  get debug() {
    return debug;
  }

  get path() {
    return path;
  }
  private static instance: Tools;
  private logger = debug("app:loggerMaker");

  private loggers: Map<string, debug.IDebugger> = new Map();

  private constructor() {}

  public getLogger(namespace: string): debug.IDebugger {
    if (this.loggers.has(namespace)) {
      return this.loggers.get(namespace) as debug.IDebugger;
    }
    this.logger(`${namespace} does not exist, creating new logger...`);
    const toInsert = debug(namespace);
    this.loggers.set(namespace, toInsert);
    return toInsert;
  }
}

// I chose the singleton pattern intead of exporting all functions

// export { config, debug, path, dotenv };
// export function getLogger(namespace: string): debug.IDebugger {
//   if (loggers.has(namespace)) {
//     return loggers.get(namespace) as debug.IDebugger;
//   }
//   logger(`${namespace} does not exist, creating new logger...`);
//   const toInsert = debug(namespace);
//   loggers.set(namespace, toInsert);
//   return toInsert;
// }
