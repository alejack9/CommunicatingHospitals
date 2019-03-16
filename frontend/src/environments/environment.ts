// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH0_CLIENTID: 'hafjbtKs0JXZQYr7ctxt8SO4cF20SVf3',
  AUTH0_DOMAIN: 'communicating-hospitals.eu.auth0.com',
  AUTH0_AUDIENCE: 'http://localhost:3000',
  BACKEND: 'https://communicating-hospitals.herokuapp.com/'
  AUTH0_REDIRECTURL: 'http://localhost:8100/callback'
  // AUTH0_REDIRECTURL: 'communicatinghospitals://callback'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
