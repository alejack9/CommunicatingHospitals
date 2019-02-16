// import { Injectable } from '@nestjs/common';
// import * as dotenv from 'dotenv';
// import * as Joi from 'joi';
// import * as fs from 'fs';

// export interface EnvConfig {
//   [key: string]: string;
// }

// @Injectable()
// export class ConfigService {
//   private readonly envConfig: EnvConfig;

//   constructor(filePath: string) {
//     const config = dotenv.parse(fs.readFileSync(filePath));
//     this.envConfig = this.validateInput(config);
//   }

//   /**
//    * Ensures all needed variables are set, and returns the validated JavaScript object
//    * including the applied default values.
//    */
//   private validateInput(envConfig: EnvConfig): EnvConfig {
//     const envVarsSchema: Joi.ObjectSchema = Joi.object({
//       NODE_ENV: Joi.string()
//         .valid(['development', 'production', 'test', 'provision'])
//         .default('development'),
//       PORT: Joi.number().default(3000),
//       APP_NAME: Joi.string().default(''),
//       APP_DESC: Joi.string().default(''),
//       DATABASE: Joi.string(),
//       DETAILS: Joi.boolean(),
//       DETAILED_RESPONSES: Joi.boolean(),
//       AUTH0_DOMAIN: Joi.string(),
//     });

//     const { error, value: validatedEnvConfig } = Joi.validate(
//       envConfig,
//       envVarsSchema,
//     );
//     if (error) {
//       throw new Error(`Config validation error: ${error.message}`);
//     }
//     return validatedEnvConfig;
//   }

//   get NODE_ENV(): string {
//     return this.envConfig.NODE_ENV;
//   }
//   get PORT(): number {
//     return Number(this.envConfig.PORT);
//   }
//   get APP_NAME(): string {
//     return this.envConfig.APP_NAME;
//   }
//   get APP_DESC(): string {
//     return this.envConfig.APP_DESC;
//   }
//   get DATABASE(): string {
//     return this.envConfig.DATABASE;
//   }
//   get DETAILS(): boolean {
//     return Boolean(this.envConfig.DETAILS);
//   }
//   get DETAILED_RESPONSES(): boolean {
//     return Boolean(this.envConfig.DETAILED_RESPONSES);
//   }
//   get AUTH0_DOMAIN(): string {
//     return this.envConfig.AUTH0_DOMAIN;
//   }
// }
